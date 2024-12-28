/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 照片详情页面
 * 功能:
 * - 大图展示照片
 * - 支持缩放和平移
 * - 照片浏览交互
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { cloudDatabase } from '@kit.CloudFoundationKit';
import { Child } from "../module/Child";
import util from "@ohos.util";
import { MainStat, resultClass } from '../common/MainStat';
import {PhotoView} from '@ohos/photoview';

@Builder
export function PageBuilder(name: string, param: Object) {
  PictureDetail()
}

@Entry
@ComponentV2
struct PictureDetail {
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!;
   @Local data: PhotoView.Model = new PhotoView.Model();

  pageInfos: NavPathStack = new NavPathStack()

  aboutToAppear() {
    setTimeout(async () => {
      let url = this.pageInfos.getParamByName('pictureDetail')[0] as string
      console.log('littleGallery', 'PictureDetail', url);
      this.data
        .setImageURI(url)
        .setScale(1, true)
        .setImageFit(ImageFit.Contain)
        .setZoomable(true)
    }, 100)
  }

  build() {
    NavDestination(){
      PhotoView({model: this.data})
    }.title('')
      .onBackPressed(() => {
        this.pageInfos.pop(new resultClass(0));
        return true
      }).onReady((context: NavDestinationContext) => {
        this.pageInfos = context.pathStack
      })
  }
}