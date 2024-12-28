/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * SettingDialog组件用于显示设置对话框
 * 功能:
 * - 孩子管理入口
 * - 分类管理入口
 * - 画册管理入口
 */

@CustomDialog
@Component
export default struct SettingDialog {
  controller?: CustomDialogController
  // 定义点击事件处理函数
  onPressAddChildren: () => void = () => {}
  onPressAlbumManage: () => void = () => {}
  onPressCategoryManage: () => void = () => {}

  build() {
    Column({ space: 20 }) {
      // 设置标题
      Text("设置").fontSize(20).fontWeight(600)
      Column({ space: 16 }) {
        // 孩子选项
        Row({ space: 10 }) {
          Image($r('app.media.children')).width(30).height(30)
          Text('孩子').fontSize(18)
        }
        .alignItems(VerticalAlign.Center)
        .onClick(() => {
          this.onPressAddChildren()
        })

        // 分类选项
        Row({ space: 10 }) {
          Image($r('app.media.category')).width(30).height(30)
          Text('分类').fontSize(18)
        }
        .alignItems(VerticalAlign.Center)
        .onClick(() => {
          this.onPressCategoryManage()
        })

        // 画册选项
        Row({ space: 10 }) {
          Image($r('app.media.album')).width(30).height(30)
          Text('画册').fontSize(18)
        }
        .alignItems(VerticalAlign.Center)
        .onClick(() => {
          this.onPressAlbumManage()
        })

        // 版本信息
        Row() {
          Text('版本：1.0.0').fontSize(12)
        }
        .justifyContent(FlexAlign.Center)
        .margin({ top: 20 })
        .width('100%')
      }
      .alignItems(HorizontalAlign.Center)
    }
    .borderRadius(10)
    .padding({ top: 16, bottom: 16, left: 16, right: 16 })
  }
}

