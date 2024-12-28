/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 添加照片页面
 * 功能:
 * - 选择并上传照片
 * - 设置照片描述和标签
 * - 关联画册和分类
 * - 保存照片数据
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { Picture } from "../module/Picture"
import { util } from "@kit.ArkTS"
import { cloudDatabase, cloudStorage } from "@kit.CloudFoundationKit"
import { hilog } from "@kit.PerformanceAnalysisKit"
import { photoAccessHelper } from "@kit.MediaLibraryKit"
import { BusinessError, request } from "@kit.BasicServicesKit"
import { fileIo } from '@kit.CoreFileKit';
import { image } from '@kit.ImageKit';
import { MainStat, resultClass } from '../common/MainStat';
import { Album } from "../module/Album"
import { AppConfig } from '../utils/AppConfig';

// 定义云存储桶
const bucket: cloudStorage.StorageBucket = cloudStorage.bucket();

type UploadCompleteCallback = (uploadSuccess: boolean) => void;

@Builder
export function PageBuilder(name: string, param: Object) {
  AddPicture()
}

@Entry
@ComponentV2
struct AddPicture {
  // 本地状态变量
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!
  @Local description: string = ''
  @Local imageUrl: string = ''
  @Local tags: string = '[]'
  @Local albumId: string = ''
  @Local categoryId: string = ''
  @Local childId: string = ''
  @Local albumName: string = '请选择画册'
  @Local albumIndex: number = 0

  @Local isUploading: boolean = false;
  @Local updateProgress: number = 0;
  @Local image: Resource | PixelMap = $r('app.media.empty_image');
  @Local accessAddress: string = '';
  @Local publicAddress: string = '';

  // 页面信息和数据库
  pageInfos: NavPathStack = new NavPathStack()
  agcDataBase: cloudDatabase.DatabaseZone | undefined = undefined

  // 页面出现时的初始化操作
  aboutToAppear() {
    this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone)

    setTimeout(async () => {
      let params: ESObject = this.pageInfos.getParamByName('addPicture')[0] as ESObject;
      if (params['action'] == 'add') {
        let album = params['album'] as Album;
        this.albumId = album.id;
        this.albumName = album.name;
        this.albumIndex = this.prop.albums.findIndex(item => item.id === album.id) + 1;
        this.childId = album.childId;
        this.categoryId = album.childId;
      }
    }, 100)
  }

  // 保存图片信息
  async onSave() {
    if (this.imageUrl.length == 0) {
      promptAction.showToast({
        message: '请选择照片',
        duration: 2000
      })
      return
    }

    try {
      const picture = new Picture();
      picture.id = util.generateRandomUUID(true);
      picture.userId = this.prop.userId;
      picture.imageUrl = this.imageUrl;
      picture.description = this.description;
      picture.tags = this.tags;
      picture.createTime = new Date();
      picture.albumId = this.albumId;
      picture.categoryId = this.categoryId;
      picture.childId = this.childId;

      await this.agcDataBase?.upsert(picture)
      promptAction.showToast({
        message: '保存成功',
        duration: 2000
      })
      this.pageInfos.pop(new resultClass(1));
    } catch (err) {
      console.log('littleGallery', 'onSave', err)
      promptAction.showToast({
        message: '保存失败',
        duration: 2000
      })
    }
  }

  @Builder
  otherProps() {
    Column() {
      // 描述部分
      Column() {
        Column({ space: 8 }) {
          Text('描述')
          TextArea({ placeholder: '添加照片描述' }).height(120)
            .onChange((value: string) => {
              this.description = value
            })
        }.alignItems(HorizontalAlign.Start)
          .width('100%').padding({ top: 8 })
          .margin({ bottom: 8 })
        Divider()
      }

      // 标签部分
      Column() {
        Row() {
          Text('标签').width('20%')
          TextInput({ placeholder: '添加标签' }).width('70%')
            .textAlign(TextAlign.End)
            .backgroundColor(Color.Transparent)
            .onChange((value: string) => {
              this.tags = value
            })
        }
          .width('100%')
          .height(40)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ bottom: 8 })
        Divider()
      }

      // 画册选择
      Column() {
        Row() {
          Text('画册').width('20%')
          Select([{ value: '请选择画册' } as SelectOption, ...this.prop.albums.map(album => ({ value: album.name } as SelectOption))])
            .selected(this.albumIndex)
            .value(this.albumName).onSelect((index: number, text?: string | undefined) => {
              if (index == 0) {
                this.albumId = ''
                this.albumName = '请选择画册'
              } else {
                let album = this.prop.albums[index - 1]
                this.albumId = album.id
                this.albumName = album.name
              }
            })
        }
          .width('100%')
          .height(40)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ bottom: 8 })
        Divider()
      }

      // 孩子选择
      Column() {
        Row() {
          Text('孩子').width('20%')
          TextInput({ placeholder: '请选择孩子' }).width('70%')
            .textAlign(TextAlign.End)
            .backgroundColor(Color.Transparent)
            .onChange((value: string) => {

            })
        }
          .width('100%')
          .height(40)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ bottom: 8 })
        Divider()
      }

      // 分类选择
      Column() {
        Row() {
          Text('分类').width('20%')
          TextInput({ placeholder: '请选择分类' }).width('70%')
            .textAlign(TextAlign.End)
            .backgroundColor(Color.Transparent)
            .onChange((value: string) => {
            })
        }
          .width('100%')
          .height(40)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ bottom: 8 })
        Divider()
      }
    }
  }

  // 构建页面
  build() {
    NavDestination() {
      Scroll() {
        Column({ space: 8 }) {
          // 图片上传部分
          Column() {
            Row() {
              Text('照片').width('20%')
              Button('选择照片', { controlSize: ControlSize.NORMAL, buttonStyle: ButtonStyleMode.TEXTUAL }).onClick(() => {
                this.upLoadImage();
              })
            }
              .width('100%')
              .height(40)
              .justifyContent(FlexAlign.SpaceBetween)
              .margin({ bottom: 8 })
            Divider()
          }
          if (this.isUploading) {
            Row() {
              Text($r('app.string.cloudStorage_progressLabel')).fontSize($r('app.float.body_font_size'))
              Text(`: ${this.updateProgress.toString().substring(0, 5)} %`).fontSize($r('app.float.body_font_size'))
            }.margin({ top: 10 })
          }
          if (this.imageUrl != '') {
            Column() {
              Row() {
                Image(this.image).objectFit(ImageFit.Contain).height(250).backgroundColor($r('app.color.black'))
              }
            }.width('90%').margin({ bottom: 15 })
          }

          // 保存按钮
          Column() {
            Row() {
              Button('保存', { type: ButtonType.Normal, stateEffect: true })
                .borderRadius(8)
                .width('100%')
                .onClick(() => {
                  this.onSave()
                })
            }
              .width('100%')
              .height(40)
              .justifyContent(FlexAlign.SpaceBetween)
              .margin({ top: 20 })
          }
        }
          .width('100%')
          .height('100%')
          .padding({ left: 20, right: 20, top: 20 })
      }
        .scrollable(ScrollDirection.Vertical) // 滚动方向纵向
        .scrollBar(BarState.On) // 滚动条常驻显示
        .scrollBarColor(Color.Gray) // 滚动条颜色
        .scrollBarWidth(10) // 滚动条宽度
        .friction(0.6)
        .edgeEffect(EdgeEffect.Spring)
    }
      .title('添加照片')
      .onBackPressed(() => {
        this.pageInfos.pop(new resultClass(0));
        return true
      })
      .onReady((context: NavDestinationContext) => {
        this.pageInfos = context.pathStack
      })
  }

  // 上传图片
  private upLoadImage() {
    this.selectImage().then((selectImageUri: string) => {
      if (!selectImageUri) {
        hilog.info(0x0000, 'littleGallery', 'cancel select image!');
        return;
      }
      this.initStates();
      // 复制选择的文件到缓存目录
      let fileName = selectImageUri.split('/').pop() as string;
      let cacheFilePath = `${getContext().cacheDir}/${fileName}`;
      this.copyFile(selectImageUri, cacheFilePath);

      let cloudPath = `${AppConfig.cloudBasePath}/image_${new Date().getTime()}.jpg`
      hilog.info(0x0000, 'littleGallery', cloudPath);
      bucket.uploadFile(getContext(this), {
        localPath: cacheFilePath,
        cloudPath: cloudPath,
      }).then(task => {
        hilog.info(0x0000, 'littleGallery', 'task');
        // 添加任务事件监听器
        this.addEventListener(task, this.onUploadCompleted(cloudPath, cacheFilePath));
        // 启动任务
        task.start();
      }).catch((err: BusinessError) => {
        hilog.info(0x0000, 'littleGallery', 'err');
        hilog.error(0x0000, 'littleGallery', 'uploadFile failed, error code: %{public}d, message: %{public}s',
          err.code, err.message);
        this.isUploading = false;
      });
    }).catch((err: Error) => {
      hilog.error(0x0000, 'littleGallery', 'upLoadImage error %{public}s', JSON.stringify(err));
      this.isUploading = false;
    });
  }

  // 选择图片
  private selectImage(): Promise<string> {
    return new Promise((resolve: (selectUri: string) => void, reject: (err: Error) => void) => {
      let photoSelectOptions = new photoAccessHelper.PhotoSelectOptions();
      photoSelectOptions.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE; // 过滤选择媒体文件类型为IMAGE
      photoSelectOptions.maxSelectNumber = 1;
      let photoViewPicker = new photoAccessHelper.PhotoViewPicker();
      photoViewPicker.select(photoSelectOptions).then((photoSelectResult: photoAccessHelper.PhotoSelectResult) => {
        resolve(photoSelectResult.photoUris[0]);
      }).catch((err: Error) => {
        reject(err)
      })
    })
  }

  // 添加事件监听器
  private addEventListener(task: request.agent.Task, completeCallback: UploadCompleteCallback) {
    task.on('progress', (progress) => {
      hilog.info(0x0000, 'littleGallery', 'on progress %{public}s', JSON.stringify(progress));
      this.updateProgress = progress.processed / progress.sizes[0] * 100;
    });
    task.on('completed', (progress) => {
      hilog.info(0x0000, 'littleGallery', 'on completed %{public}s', JSON.stringify(progress));
      completeCallback(true);
    });
    task.on('response', (response) => {
      hilog.info(0x0000, 'littleGallery', 'on response %{public}s', JSON.stringify(response));
    });
    task.on('failed', (progress) => {
      hilog.error(0x0000, 'littleGallery', 'on failed %{public}s', JSON.stringify(progress));
      completeCallback(false);
    });
  }

  // 上传完成后的操作
  private onUploadCompleted(cloudPath: string, cacheFilePath: string) {
    return (uploadSuccess: boolean) => {
      if (uploadSuccess) {
        this.imageUrl = cloudPath;
        // 上传成功后显示选中的图片并获取下载链接
        this.showSelectedImage(cacheFilePath);
        this.getDownloadUrl(cloudPath);
      }
      // 任务完成后删除缓存文件
      hilog.info(0x0000, 'littleGallery', 'delete cache file %{public}s', cacheFilePath);
      fileIo.unlink(cacheFilePath);
      this.isUploading = false;
    }
  }

  // 复制文件
  private copyFile(src: string, dest: string) {
    let srcFile = fileIo.openSync(src);
    let dstFile = fileIo.openSync(dest, fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE);
    fileIo.copyFileSync(srcFile.fd, dstFile.fd);
    fileIo.closeSync(srcFile);
    fileIo.closeSync(dstFile);
  }

  // 初始化状态
  private initStates() {
    this.isUploading = true;
    this.updateProgress = 0;
    this.image = $r('app.media.empty_image');
    this.accessAddress = '';
    this.publicAddress = '';
  }

  // 显示选中的图片
  private showSelectedImage(selectImageURL: string) {
    let imageFile = fileIo.openSync(selectImageURL, fileIo.OpenMode.READ_ONLY);
    image.createImageSource(imageFile.fd).createPixelMap({
      editable: true,
      desiredPixelFormat: 3,
    }).then(image => {
      this.image = image;
    })
  }

  // 获取下载链接
  private getDownloadUrl(path: string) {
    bucket.getDownloadURL(path).then(async (downloadURL: string) => {
      hilog.info(0x0000, 'littleGallery', 'DownloadURL: %{public}s', downloadURL);
      this.accessAddress = downloadURL;
      this.publicAddress = downloadURL;
    }).catch((err: BusinessError) => {
      hilog.error(0x0000, 'littleGallery', 'getDownloadURL fail, error code: %{public}d, message: %{public}s',
        err.code, err.message);
    });
  }
}
