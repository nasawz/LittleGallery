/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 画册列表页面
 * 功能:
 * - 展示所有画册
 * - 添加新画册
 * - 编辑画册信息
 * - 删除画册
 */

import { AppStorageV2, promptAction } from "@kit.ArkUI"
import { MainStat, resultClass } from '../common/MainStat'
import CoreService from "../services/CoreService"
import { Album } from '../module/Album'

// 页面构建器
@Builder
export function PageBuilder(name: string, param: Object) {
  ListAlbum()
}

@Entry
@ComponentV2
struct ListAlbum {
  // 本地属性，连接到 MainStat
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!
  @Local flag: number = 1
  toDelId = ''
  pageInfos: NavPathStack = new NavPathStack()

  // 页面出现时加载相册
  aboutToAppear() {
    this.loadAlbums()
  }

  // 强制重新加载
  forceReload() {
    this.flag++
  }

  // 加载相册
  loadAlbums() {
    CoreService.getService().getMyAlbums().then((albums) => {
      console.log('littleGallery', 'getMyAlbums', JSON.stringify(albums))
      this.prop.albums = albums
      this.forceReload()
    })
  }

  // 添加相册按钮
  @Builder
  addAlbumButton() {
    Button('添加新画册', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL })
      .fontColor($r('sys.color.font_secondary'))
      .onClick(() => {
        this.pageInfos.pushPathByName('addAlbum', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            this.loadAlbums()
          }
        })
    })
  }

  // 删除相册
  async deleteAlbum(id: string) {
    let succ = await CoreService.getService().deleteAlbum(id)

    if (succ) {
      promptAction.showToast({
        message: '删除成功 ' + id,
        duration: 2000
      })
      this.loadAlbums()
    } else {
      promptAction.showToast({
        message: '有关联的照片，无法删除！',
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
          this.deleteAlbum(this.toDelId)
        })
        .foregroundColor(Color.Red)
    }
  }

  // 构建页面
  build() {
    NavDestination() {
      if (this.prop.albums.length == 0) {
        Column() {
          Column({space: 20}){
            Image($r('app.media.album')).width(200).height(200).opacity(0.6)
            this.addAlbumButton()
          }.padding({ bottom: 200 })
        }.width('100%').height('100%').justifyContent(FlexAlign.Center)
      } else {
        List({ space: 16, initialIndex: 0 }) {
          ForEach(this.prop.albums, (album: Album) => {
            ListItem() {
              Row({ space: 16 }) {
                Row() {
                  Column({ space: 2 }) {
                    Text(album.name).fontSize(16)
                    Text(album.description || '暂无描述').fontSize(12).opacity(0.6)
                  }.alignItems(HorizontalAlign.Start)
                }
                Row({ space: 8 }) {
                  Button({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL }) {
                    Image($r('app.media.pen')).width(15).height(15)
                  }.width(36).height(36)
                  .onClick(() => {
                    this.pageInfos.pushPathByName('addAlbum', album, (popInfo: PopInfo) => {
                      if ((popInfo.result as resultClass).count == 1) {
                        this.loadAlbums()
                      }
                    })
                  })

                  Button({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL }) {
                    Image($r('app.media.trash')).width(15).height(15)
                  }.width(36).height(36)
                  .onClick(() => this.toDelId = album.id)
                  .bindMenu(this.DeleteMenuBuilder)
                }
              }.width('100%')
              .padding({ top: 8, bottom: 8, left: 16, right: 16 })
              .justifyContent(FlexAlign.SpaceBetween)
              .borderRadius(10)
              .backgroundColor($r('sys.color.color_sidebarcontainer_sub_bg'))
            }
          }, (album: Album) => `${album.id}-${this.flag}`)
          
          ListItem() {
            Column() {
              this.addAlbumButton()
            }.width('100%')
          }
        }.width('90%')
        .scrollBar(BarState.Off)
      }
    }
    .title('画册')
    .onBackPressed(() => {
      this.pageInfos.pop(new resultClass(0))
      return true
    })
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack
    })
  }
}