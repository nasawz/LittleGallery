/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 画册详情页面
 * 功能:
 * - 展示画册中的照片
 * - 瀑布流布局展示
 * - 添加新照片
 * - 照片管理(查看、删除)
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { cloudDatabase } from '@kit.CloudFoundationKit';
import { Child } from "../module/Child";
import util from "@ohos.util";
import { MainStat, resultClass } from "../common/MainStat";
import { Album } from "../module/Album";
import { WaterFlowDataSource } from "../common/WaterFlowDataSource";
import { Picture } from "../module/Picture";
import CoreService from "../services/CoreService";
import { PictureItem } from "../components/PictureItem";
import { WindowUtils } from '../utils/WindowUtils';

@Builder
export function PageBuilder(name: string, param: Object) {
  AlbumDetail()
}

@Entry
@ComponentV2
struct AlbumDetail {
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!;
  @Local info: Album = new Album();
  @Local pictures: Picture[] = []
  @Local loaded: boolean = false;
  pageInfos: NavPathStack = new NavPathStack()

  @Local minSize: number = 80
  @Local maxSize: number = 180
  @Local fontSize: number = 24
  @Local colors: number[] = [0xFFC0CB, 0xDA70D6, 0x6B8E23, 0x6A5ACD, 0x00FFFF, 0x00FF7F]
  dataSource: WaterFlowDataSource = new WaterFlowDataSource()
  private itemWidthArray: number[] = []
  private itemHeightArray: number[] = []
  private currentOffset: number = 0;
  private limit: number = 20;

  // 计算FlowItem宽/高
  getSize() {
    let ret = Math.floor(Math.random() * this.maxSize)
    return (ret > this.minSize ? ret : this.minSize)
  }

  // 设置FlowItem的宽/高数组
  setItemSizeArray() {
    for (let i = 0; i < 100; i++) {
      this.itemWidthArray.push(this.getSize())
      this.itemHeightArray.push(this.getSize())
    }
  }

  @Builder
  itemFoot() {
    Column() {
      Text(`Footer`)
        .fontSize(10)
        .backgroundColor(Color.Red)
        .width(50)
        .height(50)
        .align(Alignment.Center)
        .margin({ top: 2 })
    }
  }

  // 页面即将出现时调用
  aboutToAppear() {
    this.setItemSizeArray()
    setTimeout(async () => {
      this.info = this.pageInfos.getParamByName('albumDetail')[0] as Album
      await this.loadPictures()
    }, 100)
  }

  // 异步加载图片
  async loadPictures() {
    console.log('littleGallery', 'loadPictures', JSON.stringify(this.info));
    try {
      console.log('littleGallery', 'loadPictures', this.info.id, this.limit, this.currentOffset);
      const coreService = CoreService.getService();
      const pictures = await coreService.getPictures(this.info.id, this.limit, this.currentOffset);
      this.pictures = pictures;
      this.loaded = true;
      console.log('littleGallery', 'loadPictures pictures', JSON.stringify(pictures));
      if (this.currentOffset === 0) {
        this.dataSource.setData(pictures); // 首次加载使用 setData
      } else {
        this.dataSource.appendData(pictures); // 加载更多时使用 appendData
      }
      this.currentOffset += this.limit;
    } catch (error) {
      console.log('littleGallery', 'loadPictures error', JSON.stringify(error));
    }
  }

  // 跳转到添加图片页面
  goAddPicture() {
    this.pageInfos.pushPathByName('addPicture', { "action": "add", "album": this.info }, (popInfo: PopInfo) => {
      if ((popInfo.result as resultClass).count == 1) {
        this.currentOffset = 0;
        this.loadPictures();
      }
    });
  }

  // 删除图片处理
  async deleteHandle(id: string, index: number) {
    let succ = await CoreService.getService().deletePicture(id)
    if (succ) {
      promptAction.showToast({
        message: '删除成功 ' + id,
        duration: 2000
      })
      this.currentOffset = 0;
      this.loadPictures();
    } else {
      promptAction.showToast({
        message: '删除失败',
        duration: 2000
      })
    }
  }

  // 跳转到图片详情页面
  goPictureDetail(url: string) {
    this.pageInfos.pushPathByName('pictureDetail', url, (popInfo: PopInfo) => {
    });
  }

  @Builder
  addPictureButton() {
    // Button('添加孩子的作品', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL })
    //   .fontColor($r('sys.color.font_secondary'))
    //   .onClick(() => {
    //     this.goAddPicture();
    //   })

  }


  // 构建页面
  build() {
    NavDestination() {
      if (this.pictures.length > 0 && this.loaded) {
        Stack({ alignContent: Alignment.BottomEnd }) {
          WaterFlow() {
            LazyForEach(this.dataSource, (item: Picture, index) => {
              PictureItem({ picture: item, maxWidth: (px2vp(WindowUtils.windowWidth_px)-5-16) / 2, onDelete: () => {
                this.deleteHandle(item.id, index);
              }, onGoDetail: (url: string) => {
                this.goPictureDetail(url);
              }})
            }, (item: Picture) => item.id)
          }
          .columnsTemplate("1fr 1fr")
          .columnsGap(10)
          .rowsGap(5)
          .width('100%')
          .height('100%')
          .padding({left:8,right:8})
          .edgeEffect(EdgeEffect.Spring)
          .onReachStart(() => {
          })
          .onReachEnd(() => {
          })
          .onScrollFrameBegin((offset: number, state: ScrollState) => {
            console.info('waterFlow scrollFrameBegin offset: ' + offset + ' state: ' + state.toString())
            return { offsetRemain: offset }
          })
          Row() {
            Button({ type: ButtonType.Circle, stateEffect: true }) {
              Image($r('app.media.plus')).fillColor(Color.White).width(24).height(24)
            }.width(55).height(55).backgroundColor(0x317aff).onClick(() => {
              this.goAddPicture();
            })
          }.margin({ bottom: 20, right: 20 })
        }.width('100%').height('100%')
      } else if (this.pictures.length == 0 && this.loaded) {
        Column() {
          Column({ space: 20 }) {
            Image($r('app.media.palette')).width(160).height(160).opacity(0.6)
            this.addPictureButton()
          }.padding({ bottom: 200 })
        }.width('100%').height('100%').justifyContent(FlexAlign.Center)
      }
    }.title(this.info?.name)
      .onBackPressed(() => {
        const popDestinationInfo = this.pageInfos.pop()
        console.log('pop' + '返回值' + JSON.stringify(popDestinationInfo))
        return true
      }).onReady((context: NavDestinationContext) => {
        this.pageInfos = context.pathStack
      })
  }
}