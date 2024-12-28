/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 添加/编辑分类页面
 * 功能:
 * - 创建新分类
 * - 编辑现有分类信息
 * - 设置分类名称和描述
 * - 保存分类数据
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { cloudDatabase } from "@kit.CloudFoundationKit"
import { util } from "@kit.ArkTS"
import { Category } from "../module/Category"
import { MainStat, resultClass } from '../common/MainStat';
import { AppConfig } from '../utils/AppConfig';

// 页面构建器
@Builder
export function PageBuilder(name: string, param: Object) {
  AddCategory()
}

// 入口组件
@Entry
@ComponentV2
struct AddCategory {
  // 本地存储属性
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!
  @Local description: string = ''
  @Local name: string = ''

  categoryId: string = ''
  createTime: Date = new Date()

  pageInfos: NavPathStack = new NavPathStack()

  agcDataBase: cloudDatabase.DatabaseZone | undefined = undefined

  // 页面即将出现时的生命周期方法
  aboutToAppear() {
    this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);

    setTimeout(async () => {
      let category = this.pageInfos.getParamByName('addCategory')[0] as Category
      this.name = category.name;
      this.description = category.description;
      this.categoryId = category.id;
      this.createTime = category.createTime;
    }, 100)
  }

  // 保存按钮的点击事件处理
  async onSave() {
    if(this.name.length == 0) {
      promptAction.showToast({
        message: '请输入分类名称',
        duration: 2000
      })
      return
    }

    try {
      const category = new Category();
      category.id = this.categoryId == '' ? util.generateRandomUUID(true) : this.categoryId;
      category.userId = this.prop.userId;
      category.name = this.name;
      category.description = this.description;
      category.createTime = this.createTime;
              
      await this.agcDataBase?.upsert(category)
      promptAction.showToast({
        message: '保存成功',
        duration: 2000
      })
      this.pageInfos.pop(new resultClass(1));
    } catch(err) {
      console.log('littleGallery', 'onSave', err)
      promptAction.showToast({
        message: '保存失败',
        duration: 2000
      })
    }
  }

  // 构建UI界面
  build() {
    NavDestination() {
      Column({ space: 8 }) {
        Column() {
          Row() {
            Text('分类名称').width('20%')
            TextInput({ placeholder: '请输入',text: this.name }).width('70%')
              .textAlign(TextAlign.End)
              .backgroundColor(Color.Transparent)
              .onChange((value: string) => {
                this.name = value
              })
          }
          .width('100%')
          .height(40)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ bottom: 8 })
          Divider()
        }

        Column() {
          Column({space:8}) {
            Text('描述')

            TextArea({placeholder:'添加分类描述', text: this.description}).height(120).onChange((value)=>{
              this.description = value;
            })
          }.alignItems(HorizontalAlign.Start)
          .width('100%').padding({top:8})
          .margin({ bottom: 8 })
          Divider()
        }

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
    .title('添加分类')
    .onBackPressed(() => {
      this.pageInfos.pop(new resultClass(0));
      return true
    })
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack
    })
  }
}
