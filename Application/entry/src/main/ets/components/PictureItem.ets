/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * PictureItem组件用于显示图片项
 * 功能:
 * - 图片加载与展示
 * - 图片尺寸计算
 * - 长按删除功能
 */

import { Picture } from "../module/Picture";
import { BusinessError } from "@kit.BasicServicesKit";
import { cloudStorage } from "@kit.CloudFoundationKit";
import { ImageDetail, MainStat } from "../common/MainStat";
import { AppStorageV2 } from "@kit.ArkUI";

const bucket: cloudStorage.StorageBucket = cloudStorage.bucket();

@ComponentV2
export struct PictureItem {
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!;
  @Require @Param picture: Picture;
  @Require @Param maxWidth:number;
  @Require @Param onDelete:Function;
  @Require @Param onGoDetail:Function;
  @Local url:string='';
  @Local xHeight:number=0;
  @Local loaded:boolean=false;

  // 组件即将出现时调用
  aboutToAppear(): void {
    console.log('littleGallery', 'PictureItem aboutToAppear', JSON.stringify(this.picture));

    // 默认 3:4 比例
    this.xHeight = this.maxWidth * 4 / 3;
    
    // 检查图像详情是否已存储
    const existingDetail = this.prop.imageDetails.find(detail => detail.key === this.picture.imageUrl);
    if (existingDetail) {
      this.url = existingDetail.url;
      this.xHeight = existingDetail.height;
    } else {
      this.getDownloadUrl(this.picture.imageUrl);
    }
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

  // 计算图像高度
  private calcHeight(picWidth: number, picHeight: number) {
    this.xHeight = picHeight * this.maxWidth / picWidth;
    this.prop.imageDetails.push(new ImageDetail(
      this.picture.imageUrl,
      this.xHeight,
      this.url
    ));
  }

  // 删除菜单构建器
  @Builder
  DeleteMenuBuilder() {
    Menu() {
      MenuItem({ startIcon: $r("app.media.trash"), content: "删除" })
        .onClick(() => {
          this.onDelete();
        })
        .foregroundColor(Color.Red)
    }
  }

  // 构建组件
  build() {
    FlowItem() {
      Column() {
        Stack() {
          if (this.url != '') {
            Column() {
              Image(this.url)
                .draggable(false)
                .objectFit(ImageFit.Fill)
                .width('100%')
                .layoutWeight(1)
                .onComplete((e) => {
                  let picWidth = e?.width;
                  let picHeight = e?.height;
                  if (picWidth && picWidth > 0 && picHeight && picHeight > 0) {
                    this.calcHeight(picWidth, picHeight);
                    this.loaded = true;
                  }
                })
            }.padding({left:4,right:4,top:4,bottom:4}).backgroundColor(Color.White)
            .shadow({
              radius: 10,
              color: '#EAEAEA',
              offsetX: vp2px(0),
              offsetY: vp2px(0)
            })
            .bindContextMenu(this.DeleteMenuBuilder, ResponseType.LongPress)
            .onDragStart(() => {
              ContextMenu.close()
            })

            if (this.loaded == false) {
              LoadingProgress()
                .layoutWeight(1).width(30).height(30)
            }
          }
        }
      }
    }.width(this.maxWidth).height(this.xHeight).padding({left:6,right:6,top:6,bottom:6})
    .onClick(() => {
      this.onGoDetail(this.url);
    })
  }
}