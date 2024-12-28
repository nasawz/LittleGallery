/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 孩子列表页面
 * 功能:
 * - 展示所有孩子
 * - 添加新孩子
 * - 编辑孩子信息
 * - 删除孩子档案
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { cloudDatabase } from '@kit.CloudFoundationKit';
import { Child } from "../module/Child";
import util from "@ohos.util";
import { MainStat, resultClass } from '../common/MainStat';
import CoreService from "../services/CoreService";
import { AppConfig } from '../utils/AppConfig';

@Builder
export function PageBuilder(name: string, param: Object) {
  ListChild()
}

@Entry
@ComponentV2
struct ListChild {
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!;
  @Local flag:number=1;
  toDelId = '';

  pageInfos: NavPathStack = new NavPathStack()
  agcDataBase: cloudDatabase.DatabaseZone | undefined = undefined;

  // 生命周期方法：组件即将出现时调用
  aboutToAppear() {
    this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);
  }

  // 从服务加载孩子数据
  loadChild() {
    CoreService.getService().getMyChild().then((child) => {
      console.log('littleGallery', 'getMyChild', JSON.stringify(child));
      this.prop.child = child;
      this.forceReload();
    });
  }

  // 通过增加标志强制UI重新加载
  forceReload(){
    this.flag++;
  }

  // 根据生日计算年龄
  calculateAge(birthday: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDifference = today.getMonth() - birthday.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }

  @Builder
  addChildButton(){
    // 添加孩子按钮
    Button('添加您的孩子', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL })
      .fontColor($r('sys.color.font_secondary'))
      .onClick(()=>{
        this.pageInfos.pushPathByName('addChild', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            this.loadChild();
          }
        });
    })
  }

  // 根据ID删除孩子
  async deleteChild(id:string){
    let succ = await CoreService.getService().deleteChild(id);

    if(succ){
      promptAction.showToast({
        message: '删除成功 ' + id,
        duration: 2000
      })
      this.loadChild();
    }else{
      promptAction.showToast({
        message: '有关联的记录，无法删除！',
        duration: 2000
      })
    }
    this.toDelId = ''
  }

  @Builder
  DeleteMenuBuilder() {
    // 删除菜单构建器
    Menu() {
      MenuItem({ startIcon: $r("app.media.trash"), content: "确认删除" })
        .onClick(() => {
          this.deleteChild(this.toDelId)
        })
        .foregroundColor(Color.Red)
    }
  }

  // 构建UI
  build() {
    NavDestination() {
      if(this.prop.child.length == 0){
        Column(){
          Column({space: 20}){
            Image($r('app.media.holding_child')).width(160).height(160).opacity(0.6)
            this.addChildButton()
          }.padding({bottom: 200})
        }.width('100%').height('100%').justifyContent(FlexAlign.Center)
      }else{
        List({ space: 16, initialIndex: 0 }) {
          ForEach(this.prop.child, (child: Child) => {
            ListItem() {
              Row({space: 16}){
                Row(){
                  Row(){
                    if(child.gender == '男孩'){
                      Image($r('app.media.boy')).width(30).height(30).opacity(0.6)
                    }else{
                      Image($r('app.media.girl')).width(30).height(30).opacity(0.6)
                    }
                  }
                  Column({space: 2}){
                    Text(child.name).fontSize(16)
                    Text(this.calculateAge(child.birthday) + '岁').fontSize(12).opacity(0.6)
                  }.alignItems(HorizontalAlign.Start)
                }
                Row({space: 8}){
                  Button({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL }) {
                    Image($r('app.media.pen')).width(15).height(15)
                  }.width(36).height(36).onClick(()=>{
                    this.pageInfos.pushPathByName('addChild', child, (popInfo: PopInfo) => {
                      if ((popInfo.result as resultClass).count == 1) {
                        this.loadChild();
                      }
                    });
                  })

                  Button({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL }) {
                    Image($r('app.media.trash')).width(15).height(15)
                  }.width(36).height(36)
                  .onClick(()=>this.toDelId = child.id)
                  .bindMenu(this.DeleteMenuBuilder)
                }
              }.width('100%')
              .padding({top: 8, bottom: 8, left: 16, right: 16})
              .justifyContent(FlexAlign.SpaceBetween)
              .borderRadius(10)
              .backgroundColor($r('sys.color.color_sidebarcontainer_sub_bg'))
            }
          }, (child: Child) => `${child.id}-${this.flag}`)
          ListItem(){
            Column(){
              this.addChildButton()
            }.width('100%')
          }
        }.width('90%')
        .scrollBar(BarState.Off)
      }
    }
    .title('孩子')
    .onBackPressed(() => {
      this.pageInfos.pop(new resultClass(0));
      return true;
    })
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack;
    });
  }
}