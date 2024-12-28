/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 分类列表页面
 * 功能:
 * - 展示所有分类
 * - 添加新分类
 * - 编辑分类信息
 * - 删除分类
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { MainStat, resultClass } from '../common/MainStat'
import CoreService from "../services/CoreService"
import { Category } from '../module/Category'

// 页面构建器
@Builder
export function PageBuilder(name: string, param: Object) {
  ListCategory()
}

@Entry
@ComponentV2
struct ListCategory {
  // 本地属性，连接到应用存储
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!
  @Local flag: number = 1
  toDelId = ''
  pageInfos: NavPathStack = new NavPathStack()

  // 页面即将出现时加载分类
  aboutToAppear() {
    this.loadCategories()
  }

  // 强制重新加载
  forceReload() {
    this.flag++
  }

  // 加载分类
  loadCategories() {
    CoreService.getService().getMyCategory().then((categories) => {
      console.log('littleGallery', 'getMyCategory', JSON.stringify(categories))
      this.prop.categories = categories
      this.forceReload()
    })
  }

  // 添加分类按钮构建器
  @Builder
  addCategoryButton() {
    Button('添加新分类', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL })
      .fontColor($r('sys.color.font_secondary'))
      .onClick(() => {
        this.pageInfos.pushPathByName('addCategory', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            this.loadCategories()
          }
        })
    })
  }

  // 删除分类
  async deleteCategory(id: string) {
    let succ = await CoreService.getService().deleteCategory(id)

    if (succ) {
      promptAction.showToast({
        message: '删除成功 ' + id,
        duration: 2000
      })
      this.loadCategories()
    } else {
      promptAction.showToast({
        message: '有关联的相册，无法删除！',
        duration: 2000
      })
    }
    this.toDelId = ''
  }

  // 删除菜单构建器
  @Builder
  DeleteMenuBuilder() {
    Menu() {
      MenuItem({ startIcon: $r("app.media.trash"), content: "确认删除" })
        .onClick(() => {
          this.deleteCategory(this.toDelId)
        })
        .foregroundColor(Color.Red)
    }
  }

  // 构建页面
  build() {
    NavDestination() {
      if (this.prop.categories.length == 0) {
        Column() {
          Column({space: 20}){
            Image($r('app.media.category')).width(200).height(200).opacity(0.6)
            this.addCategoryButton()
          }.padding({ bottom: 200 })
        }.width('100%').height('100%').justifyContent(FlexAlign.Center)
      } else {
        List({ space: 16, initialIndex: 0 }) {
          ForEach(this.prop.categories, (category: Category) => {
            ListItem() {
              Row({ space: 16 }) {
                Column({ space: 2 }) {
                  Text(category.name).fontSize(16)
                  Text(category.description || '暂无描述').fontSize(12).opacity(0.6)
                }.alignItems(HorizontalAlign.Start)
                Row({ space: 8 }) {
                  Button({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL }) {
                    Image($r('app.media.pen')).width(15).height(15)
                  }.width(36).height(36)
                  .onClick(() => {
                    this.pageInfos.pushPathByName('addCategory', category, (popInfo: PopInfo) => {
                      if ((popInfo.result as resultClass).count == 1) {
                        this.loadCategories()
                      }
                    })
                  })

                  Button({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL }) {
                    Image($r('app.media.trash')).width(15).height(15)
                  }.width(36).height(36)
                  .onClick(() => this.toDelId = category.id)
                  .bindMenu(this.DeleteMenuBuilder)
                }
              }.width('100%')
              .padding({ top: 8, bottom: 8, left: 16, right: 16 })
              .justifyContent(FlexAlign.SpaceBetween)
              .borderRadius(10)
              .backgroundColor($r('sys.color.color_sidebarcontainer_sub_bg'))
            }
          }, (category: Category) => `${category.id}-${this.flag}`)
          
          ListItem() {
            Column() {
              this.addCategoryButton()
            }.width('100%')
          }
        }.width('90%')
        .scrollBar(BarState.Off)
      }
    }
    .title('分类')
    .onBackPressed(() => {
      this.pageInfos.pop(new resultClass(0))
      return true
    })
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack
    })
  }
}
