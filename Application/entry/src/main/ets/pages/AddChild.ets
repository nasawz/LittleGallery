/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 添加/编辑孩子页面
 * 功能:
 * - 创建新孩子档案
 * - 编辑现有孩子信息
 * - 设置孩子基本信息(姓名、性别、生日)
 * - 保存孩子数据
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { cloudDatabase } from '@kit.CloudFoundationKit';
import { Child } from "../module/Child";
import util from "@ohos.util";
import { MainStat, resultClass } from '../common/MainStat';
import { AppConfig } from '../utils/AppConfig';

@Builder
export function PageBuilder(name: string, param: Object) {
  AddChild()
}

@Entry
@ComponentV2
struct AddChild {
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!;

  pageInfos: NavPathStack = new NavPathStack()
  @Local gender: string = "男孩" // 默认性别为男孩
  @Local index: number = 0
  @Local name: string = "" // 存储孩子的姓名
  @Local birthday: Date = new Date(new Date().setFullYear(new Date().getFullYear() - 5)) // 默认生日为5年前

  childId = ""; // 孩子的ID

  agcDataBase: cloudDatabase.DatabaseZone | undefined = undefined;

  aboutToAppear() {
    this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);

    setTimeout(async () => {
      let child = this.pageInfos.getParamByName('addChild')[0] as Child
      this.name = child.name;
      this.birthday = child.birthday;
      this.gender = child.gender;
      if(child.gender=='女孩'){
        this.index=1;
      }
      this.childId = child.id;
    }, 100)
  }

  async onSave(){
    // 保存孩子信息
    if(this.name.length==0){
      promptAction.showToast({
        message: '请输入姓名',
        duration: 2000
      });
      return;
    }
    if(this.birthday>new Date()){
      promptAction.showToast({
        message: '生日不能大于当前日期',
        duration: 2000
      });
      return;
    }
    try{
      let child = new Child();
      child.id = this.childId=="" ? util.generateRandomUUID(true) : this.childId;
      child.userId=this.prop.userId;
      child.name = this.name;
      child.birthday = this.birthday;
      child.gender = this.gender;
      await this.agcDataBase?.upsert(child);
      promptAction.showToast({
        message: '保存成功',
        duration: 2000
      });
      this.pageInfos.pop(new resultClass(1));
    }catch(err){
      console.log('littleGallery', 'onSave', err)
      promptAction.showToast({
        message: '保存失败',
        duration: 2000
      });
    }
  }

  build() {
    NavDestination(){
      Column({space:8}) {
        Column(){
          Row() {
            Text('姓名').width('20%')
            TextInput({ placeholder: '请输入' ,text:this.name}).width('70%')
              .textAlign(TextAlign.End)
              .backgroundColor(Color.Transparent).onChange((value)=>{
                this.name=value;
            })
          }
          .width('100%')
          .height(40)
          .justifyContent(FlexAlign.SpaceBetween)
          .margin({ bottom: 8 })
          Divider()
        }
        Column(){
          Row(){
            Text('生日')
            CalendarPicker({selected:this.birthday}).onChange((value:Date)=>{
              this.birthday = value;
            })
          }.width('100%').height(40).justifyContent(FlexAlign.SpaceBetween).margin({bottom:8})
          Divider()
        }
        Column(){
          Row(){
            Text('性别')
            Select([{value:'男孩'},{value:'女孩'}]).selected(this.index)
              .value(this.gender).onSelect((index:number, text?: string | undefined)=>{
              this.index = index;
              if(text){
                this.gender = text;
              }
            })
          }.width('100%').height(40).justifyContent(FlexAlign.SpaceBetween).margin({bottom:8})
          Divider()
        }
        Column(){
          Row(){
            Button('保存', { type: ButtonType.Normal, stateEffect: true })
              .borderRadius(8)
              .width('100%')
              .onClick(() => {
                this.onSave();
              })
          }.width('100%').height(40).justifyContent(FlexAlign.SpaceBetween).margin({top:20})
        }
      }.width('100%').height('100%').padding({left:20,right:20,top:20})
    }.title('添加您的孩子')
      .onBackPressed(() => {
        this.pageInfos.pop(new resultClass(0));
        return true
      }).onReady((context: NavDestinationContext) => {
        this.pageInfos = context.pathStack
      })
  }
}