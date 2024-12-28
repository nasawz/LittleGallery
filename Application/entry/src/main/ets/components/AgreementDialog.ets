/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * AgreementDialog类用于显示隐私政策与服务协议对话框
 * 功能:
 * - 显示对话框内容
 * - 处理点击事件
 */

@CustomDialog
@Component
export default struct AgreementDialog {
  @State contentHeight: number = 220 // 定义内容高度的状态变量
  controller?: CustomDialogController // 可选的自定义对话框控制器
  cancel: () => void = () => {} // 取消按钮的点击事件处理函数
  confirm: () => void = () => {} // 同意按钮的点击事件处理函数
  onPressPrivacyPolicy: () => void = () => {} // 点击隐私政策的事件处理函数
  onPressUserAgreement: () => void = () => {} // 点击用户协议的事件处理函数
  



  build() {
    Column({ space: 10 }) { // 创建一个垂直布局，子元素间距为10
        Text("隐私政策与服务协议").fontSize(18).fontWeight(600) // 标题文本，字体大小18，粗体
        Text(){
          Span("为了更好的保护您的个人信息，我们根据最新法律法规及相关政策要求，请您仔细阅读并确认")
          Span("《隐私政策》").fontColor('#689c36').onClick(()=>{
            this.onPressPrivacyPolicy() // 点击《隐私政策》时调用的函数
          })
          Span("和")
          Span("《服务协议》").fontColor('#689c36').onClick(()=>{
            this.onPressUserAgreement() // 点击《服务协议》时调用的函数
          })
          Span("。我们会严格按照约定收集、存储和使用您在使用本软件过程中的涉及的个人信息，以便为您提供更优质的服务，感谢您的信任与理解。")
        }

        Row({ space: 10 }) { // 创建一个水平布局，子元素间距为10
            Button("取消").fontColor('#60000000').onClick(() => {
                this.cancel() // 点击取消按钮时调用的函数
            }).width('40%').backgroundColor(Color.Transparent) // 按钮宽度40%，背景透明
            Button("同意").onClick(() => {
                this.confirm() // 点击同意按钮时调用的函数
            }).width('40%') // 按钮宽度40%
        }
    }
    .borderRadius(20) // 设置圆角半径为20
    .padding({ top: 16, bottom: 16, left: 16, right: 16 }) // 设置内边距
    .height(this.contentHeight) // 设置高度为contentHeight
  }
}

// 隐私政策与服务协议
// 为了更好的保护您的个人信息，我们根据最新法律法规及相关政策要求，请您仔细阅读并确认《隐私政策》《服务协议》。我们会严格按照约定收集、存储和使用您在使用本软件过程中的涉及的个人信息，以便为您提供更优质的服务，感谢您的信任与理解。