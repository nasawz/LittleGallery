if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import { Picture } from "@normalized:N&&&entry/src/main/ets/module/Picture&";
import util from "@ohos:util";
import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
import cloudStorage from "@hms:core.deviceCloudGateway.cloudStorage";
import hilog from "@ohos:hilog";
import photoAccessHelper from "@ohos:file.photoAccessHelper";
import type { BusinessError } from "@ohos:base";
import type request from "@ohos:request";
import fileIo from "@ohos:file.fs";
import image from "@ohos:multimedia.image";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import type { Album } from "../module/Album";
import { AppConfig } from "@normalized:N&&&entry/src/main/ets/utils/AppConfig&";
// 定义云存储桶
const bucket: cloudStorage.StorageBucket = cloudStorage.bucket();
type UploadCompleteCallback = (uploadSuccess: boolean) => void;
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new AddPicture(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AddPicture.ets", line: 37, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "AddPicture" });
    }
}
class AddPicture extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.description = '';
        this.imageUrl = '';
        this.tags = '[]';
        this.albumId = '';
        this.categoryId = '';
        this.childId = '';
        this.albumName = '请选择画册';
        this.albumIndex = 0;
        this.isUploading = false;
        this.updateProgress = 0;
        this.image = { "id": 16777305, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" };
        this.accessAddress = '';
        this.publicAddress = '';
        this.pageInfos = new NavPathStack();
        this.agcDataBase = undefined;
        this.finalizeConstruction();
    }
    // 本地状态变量
    @Local
    prop: MainStat;
    @Local
    description: string;
    @Local
    imageUrl: string;
    @Local
    tags: string;
    @Local
    albumId: string;
    @Local
    categoryId: string;
    @Local
    childId: string;
    @Local
    albumName: string;
    @Local
    albumIndex: number;
    @Local
    isUploading: boolean;
    @Local
    updateProgress: number;
    @Local
    image: Resource | PixelMap;
    @Local
    accessAddress: string;
    @Local
    publicAddress: string;
    // 页面信息和数据库
    pageInfos: NavPathStack;
    agcDataBase: cloudDatabase.DatabaseZone | undefined;
    // 页面出现时的初始化操作
    aboutToAppear() {
        this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);
        setTimeout(async () => {
            let params: any = this.pageInfos.getParamByName('addPicture')[0] as any;
            if (params['action'] == 'add') {
                let album = params['album'] as Album;
                this.albumId = album.id;
                this.albumName = album.name;
                this.albumIndex = this.prop.albums.findIndex(item => item.id === album.id) + 1;
                this.childId = album.childId;
                this.categoryId = album.childId;
            }
        }, 100);
    }
    // 保存图片信息
    async onSave() {
        if (this.imageUrl.length == 0) {
            promptAction.showToast({
                message: '请选择照片',
                duration: 2000
            });
            return;
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
            await this.agcDataBase?.upsert(picture);
            promptAction.showToast({
                message: '保存成功',
                duration: 2000
            });
            this.pageInfos.pop(new resultClass(1));
        }
        catch (err) {
            console.log('littleGallery', 'onSave', err);
            promptAction.showToast({
                message: '保存失败',
                duration: 2000
            });
        }
    }
    otherProps(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 描述部分
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.alignItems(HorizontalAlign.Start);
            Column.width('100%');
            Column.padding({ top: 8 });
            Column.margin({ bottom: 8 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('描述');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextArea.create({ placeholder: '添加照片描述' });
            TextArea.height(120);
            TextArea.onChange((value: string) => {
                this.description = value;
            });
        }, TextArea);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
        }, Divider);
        // 描述部分
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标签部分
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(40);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('标签');
            Text.width('20%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '添加标签' });
            TextInput.width('70%');
            TextInput.textAlign(TextAlign.End);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange((value: string) => {
                this.tags = value;
            });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
        }, Divider);
        // 标签部分
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 画册选择
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(40);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('画册');
            Text.width('20%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Select.create([{ value: '请选择画册' } as SelectOption, ...this.prop.albums.map(album => ({ value: album.name } as SelectOption))]);
            Select.selected(this.albumIndex);
            Select.value(this.albumName);
            Select.onSelect((index: number, text?: string | undefined) => {
                if (index == 0) {
                    this.albumId = '';
                    this.albumName = '请选择画册';
                }
                else {
                    let album = this.prop.albums[index - 1];
                    this.albumId = album.id;
                    this.albumName = album.name;
                }
            });
        }, Select);
        Select.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
        }, Divider);
        // 画册选择
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 孩子选择
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(40);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('孩子');
            Text.width('20%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请选择孩子' });
            TextInput.width('70%');
            TextInput.textAlign(TextAlign.End);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange((value: string) => {
            });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
        }, Divider);
        // 孩子选择
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分类选择
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(40);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.margin({ bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('分类');
            Text.width('20%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: '请选择分类' });
            TextInput.width('70%');
            TextInput.textAlign(TextAlign.End);
            TextInput.backgroundColor(Color.Transparent);
            TextInput.onChange((value: string) => {
            });
        }, TextInput);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
        }, Divider);
        // 分类选择
        Column.pop();
        Column.pop();
    }
    // 构建页面
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Scroll.create();
                    Scroll.scrollable(ScrollDirection.Vertical);
                    Scroll.scrollBar(BarState.On);
                    Scroll.scrollBarColor(Color.Gray);
                    Scroll.scrollBarWidth(10);
                    Scroll.friction(0.6);
                    Scroll.edgeEffect(EdgeEffect.Spring);
                }, Scroll);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 8 });
                    Column.width('100%');
                    Column.height('100%');
                    Column.padding({ left: 20, right: 20, top: 20 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图片上传部分
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(40);
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('照片');
                    Text.width('20%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('选择照片', { controlSize: ControlSize.NORMAL, buttonStyle: ButtonStyleMode.TEXTUAL });
                    Button.onClick(() => {
                        this.upLoadImage();
                    });
                }, Button);
                Button.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                }, Divider);
                // 图片上传部分
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isUploading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.margin({ top: 10 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create({ "id": 16777249, "type": 10003, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                Text.fontSize({ "id": 16777295, "type": 10002, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`: ${this.updateProgress.toString().substring(0, 5)} %`);
                                Text.fontSize({ "id": 16777295, "type": 10002, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                            }, Text);
                            Text.pop();
                            Row.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.imageUrl != '') {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('90%');
                                Column.margin({ bottom: 15 });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create(this.image);
                                Image.objectFit(ImageFit.Contain);
                                Image.height(250);
                                Image.backgroundColor({ "id": 16777285, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                            }, Image);
                            Row.pop();
                            Column.pop();
                        });
                    }
                    // 保存按钮
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 保存按钮
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(40);
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ top: 20 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('保存', { type: ButtonType.Normal, stateEffect: true });
                    Button.borderRadius(8);
                    Button.width('100%');
                    Button.onClick(() => {
                        this.onSave();
                    });
                }, Button);
                Button.pop();
                Row.pop();
                // 保存按钮
                Column.pop();
                Column.pop();
                Scroll.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AddPicture" });
            NavDestination.title('添加照片');
            NavDestination.onBackPressed(() => {
                this.pageInfos.pop(new resultClass(0));
                return true;
            });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
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
            let cloudPath = `${AppConfig.cloudBasePath}/image_${new Date().getTime()}.jpg`;
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
                hilog.error(0x0000, 'littleGallery', 'uploadFile failed, error code: %{public}d, message: %{public}s', err.code, err.message);
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
                reject(err);
            });
        });
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
        };
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
        this.image = { "id": 16777305, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" };
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
        });
    }
    // 获取下载链接
    private getDownloadUrl(path: string) {
        bucket.getDownloadURL(path).then(async (downloadURL: string) => {
            hilog.info(0x0000, 'littleGallery', 'DownloadURL: %{public}s', downloadURL);
            this.accessAddress = downloadURL;
            this.publicAddress = downloadURL;
        }).catch((err: BusinessError) => {
            hilog.error(0x0000, 'littleGallery', 'getDownloadURL fail, error code: %{public}d, message: %{public}s', err.code, err.message);
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AddPicture";
    }
}
registerNamedRoute(() => new AddPicture(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/AddPicture", pageFullPath: "entry/src/main/ets/pages/AddPicture", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("addPicture", wrapBuilder(PageBuilder));
    }
})();
