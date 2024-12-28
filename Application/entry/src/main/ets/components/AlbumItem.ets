/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * AlbumItem组件用于显示相册项
 * 功能:
 * - 相册封面展示
 * - 相册信息显示
 * - 点击交互处理
 */

import { Album } from "../module/Album";
import { cloudStorage } from "@kit.CloudFoundationKit";
import { BusinessError } from "@kit.BasicServicesKit";
import { MainStat } from "../common/MainStat";
import { AppStorageV2 } from "@kit.ArkUI";

const bucket: cloudStorage.StorageBucket = cloudStorage.bucket();
const PI = 3.14;
@ComponentV2
export struct AlbumItem {
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!;
  @Require @Param item: Album;
  @Require @Param onGoDetail: Function;
  @Require @Param maxWidth: number;
  @Local url: string = '';
  @Local childName: string = '';


  // static const PI=3.14;
  // static  PI=3.14;



  // 比例
  ratio: number = 3 / 4;

  // 组件即将出现时调用
  aboutToAppear(): void {
    if (this.item.coverImage) {
      this.getDownloadUrl(this.item.coverImage);
    }

    this.prop.child.forEach(child => {
      if (child.id == this.item.childId) {
        this.childName = child.name;
      }
    });
  }

  // 获取下载URL
  private getDownloadUrl(path: string) {
    console.log('littleGallery', 'PictureItem getDownloadUrl', path);
    bucket.getDownloadURL(path).then(async (downloadURL: string) => {
      console.log('littleGallery', 'PictureItem getDownloadUrl', downloadURL);
      this.url = downloadURL;
    }).catch((err: BusinessError) => {
      // 错误处理
    });
  }

  build() {
    Stack() {
      Column() {
      }
      .width(this.maxWidth)
      .height(this.maxWidth * this.ratio)
      .alignItems(HorizontalAlign.Start)
      .justifyContent(FlexAlign.End)
      .backgroundColor(Color.White)
      .shadow({
        radius: 10,
        color: '#50000000',
        offsetX: vp2px(0),
        offsetY: vp2px(0)
      })

      if (this.url != '') {
        Row(){
          Image(this.url).objectFit(ImageFit.Cover)
            .width(this.maxWidth)
            .height(this.maxWidth * this.ratio);
        }.width(this.maxWidth)
        .height(this.maxWidth * this.ratio);
      }

      Row() {
      }
      .linearGradient({
        angle: 90,
        colors: [[0x94B4ED, 0.0], ['#A1C2FF', 0.05],['#95A1C2FF', 0.5], ['#90A1C2FF', 1.0]]
      })
      .width(this.maxWidth)
      .height(this.maxWidth * this.ratio);

      Row({ space: 6 }) {
        if (this.item.description != '') {
          Row() {
            Text(this.item.description).fontSize(10).fontColor($r('sys.color.font_secondary'))
          }.width(10)
        }
        Row() {
          Text(this.item.name)
        }
        .width(20)
      }
      .alignItems(VerticalAlign.Top)
      .justifyContent(FlexAlign.Center)
      .padding({ left: 8, right: 8, top: 8, bottom: 8 })
      .linearGradient({
        angle: 90,
        colors: [[0xEEEEEE, 0.0], [0xffffff, 0.1], [0xffffff, 1.0]]
      })
      .margin({ top: 10 });

      if (this.childName != '') {
        Row() {
          Row() {
            Text(this.childName).fontSize(12)
          }
          .height(20)
          .padding({ top: 4, bottom: 4, left: 6, right: 8 })
          .backgroundColor(Color.White)
          .margin({ bottom: 8, right: 8 })
        }
        .alignItems(VerticalAlign.Bottom)
        .justifyContent(FlexAlign.End)
        .width(this.maxWidth)
        .height(this.maxWidth * this.ratio)
      }
    }
    .onClick(() => {
      this.onGoDetail(this.item);
    })
    .alignContent(Alignment.TopStart);
  }
}