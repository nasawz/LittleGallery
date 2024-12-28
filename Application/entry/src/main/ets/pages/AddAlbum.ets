/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 添加/编辑画册页面
 * 功能:
 * - 创建新画册
 * - 编辑现有画册信息
 * - 选择画册分类和关联孩子
 * - 保存画册数据
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { cloudDatabase } from "@kit.CloudFoundationKit"
import { util } from "@kit.ArkTS"
import { Album } from "../module/Album"
import { MainStat, resultClass } from '../common/MainStat';
import { AppConfig } from '../utils/AppConfig';

// 定义选择选项的接口
interface SelectOption {
  value: string
}

@Builder
export function PageBuilder(name: string, param: Object) {
  AddAlbum()
}

@Entry
@ComponentV2
struct AddAlbum {
  // 本地状态变量
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!
  @Local description: string = ''
  @Local name: string = ''
  @Local childId: string = ''
  @Local childName: string = '请选择'  
  @Local childIndex: number = 0
  @Local categoryId: string = ''
  @Local categoryName: string = '请选择'
  @Local categoryIndex: number = 0

  albumId: string = ''
  createTime: Date = new Date()

  pageInfos: NavPathStack = new NavPathStack()
  agcDataBase: cloudDatabase.DatabaseZone | undefined = undefined

  aboutToAppear() {
    // 初始化数据库连接
    this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);

    setTimeout(async () => {
      // 获取页面参数
      let params: ESObject = this.pageInfos.getParamByName('addAlbum')[0] as ESObject;

      console.log('littleGallery', 'addAlbum', JSON.stringify(params));
      if (params["categoryId"] != null&&params['id']==null) {
        // 设置分类信息
        this.categoryId = params['categoryId'];
        this.categoryIndex = this.prop.categories.findIndex(category => category.id == this.categoryId) + 1;
        if (this.categoryIndex == 0) {
          this.categoryName = '请选择'
        } else {
          this.categoryName = this.prop.categories[this.categoryIndex - 1].name
        }
      } else {
        // 设置相册信息
        let album = this.pageInfos.getParamByName('addAlbum')[0] as Album
        this.name = album.name;
        this.description = album.description;
        
        this.categoryId = album.categoryId;
        this.categoryIndex = this.prop.categories.findIndex(category => category.id == this.categoryId) + 1;
        if (this.categoryIndex == 0) {
          this.categoryName = '请选择'
        } else {
          this.categoryName = this.prop.categories[this.categoryIndex - 1].name
        }

        console.log('littleGallery', 'child',JSON.stringify(this.prop.child));
        this.childIndex = this.prop.child.findIndex(child => child.id == album.childId) + 1;
        console.log('littleGallery', 'childIndex',this.childIndex);
        this.childId = album.childId;
        if (this.childIndex == 0) {
          this.childName = '请选择'
        } else {
          this.childName = this.prop.child[this.childIndex - 1].name
        }

        this.albumId = album.id
        this.createTime = album.createTime
      }
    }, 100)
  }

  async onSave() {
    // 验证输入
    if (this.name.length == 0) {
      promptAction.showToast({
        message: '请输入画册名称',
        duration: 2000
      })
      return
    }
    if (this.childId == '') {
      promptAction.showToast({
        message: '请选择孩子',
        duration: 2000
      })
      return
    }
    if (this.categoryId == '') {
      promptAction.showToast({
        message: '请选择分类',
        duration: 2000
      })
      return
    }

    try {
      // 创建并保存相册
      const album = new Album();
      album.id = this.albumId == '' ? util.generateRandomUUID(true) : this.albumId;
      album.userId = this.prop.userId;
      album.name = this.name;
      album.description = this.description;
      album.childId = this.childId;
      album.categoryId = this.categoryId;
      album.createTime = this.createTime;
      
      await this.agcDataBase?.upsert(album)
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

  build() {
    NavDestination() {
      Column({ space: 8 }) {
        // 画册名称输入
        Column() {
          Row() {
            Text('画册名称').width('20%')
            TextInput({ placeholder: '请输入', text: this.name }).width('70%')
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

        // 描述输入
        Column() {
          Column({ space: 8 }) {
            Text('描述')
            TextArea({ placeholder: '添加画册描述', text: this.description }).height(120)
              .onChange((value: string) => {
                this.description = value
              })
          }.alignItems(HorizontalAlign.Start)
          .width('100%').padding({ top: 8 })
          .margin({ bottom: 8 })
          Divider()
        }

        // 孩子选择
        Column() {
          Row() {
            Text('孩子').width('20%')
            Select([{ value: '请选择' } as SelectOption, ...this.prop.child.map(child => ({ value: child.name } as SelectOption))])
              .selected(this.childIndex)
              .enabled(this.albumId == '')
              .value(this.childName).onSelect((index: number, text?: string | undefined) => {
                if (index == 0) {
                  this.childId = ''
                  this.childName = '请选择'
                } else {
                  let child = this.prop.child[index - 1]
                  this.childId = child.id
                  this.childName = child.name
                }
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
            Select([{ value: '请选择' } as SelectOption, ...this.prop.categories.map(category => ({ value: category.name } as SelectOption))])
              .selected(this.categoryIndex)
              .enabled(this.albumId == '')
              .value(this.categoryName).onSelect((index: number, text?: string | undefined) => {
                if (index == 0) {
                  this.categoryId = ''
                  this.categoryName = '请选择'
                } else {
                  let category = this.prop.categories[index - 1]
                  this.categoryId = category.id
                  this.categoryName = category.name
                }
            })
          }
          .width('100%')
          .height(40)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ bottom: 8 })
          Divider()
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
    .title('添加画册')
    .onBackPressed(() => {
      this.pageInfos.pop(new resultClass(0));
      return true;
    })
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack
    })
  }
}
