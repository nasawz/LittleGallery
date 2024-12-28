/**
 * Copyright (c) 2024 风华(QQ:12446006)
 * 
 * 此代码仅供学习使用,禁止:
 * 1. 在华为应用商店发布
 * 2. 销售或用于商业用途
 * 3. 用于任何盈利目的
 * 
 * 小小画廊应用主页面
 * 功能:
 * - 用户认证管理
 * - 数据加载与展示
 * - 分类、孩子和相册管理
 * - 界面导航与交互
 */

import auth from '@hw-agconnect/auth';
import { AppStorageV2, promptAction } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { cloudCommon } from '@kit.CloudFoundationKit';
import { MainStat, resultClass } from '../common/MainStat';
import CoreService from '../services/CoreService';
import SettingDialog from '../components/SettingDialog';
import { common } from '@kit.AbilityKit';
import { Album } from '../module/Album';
import { Category } from '../module/Category';
import { Child } from '../module/Child';
import { AlbumItem } from '../components/AlbumItem';
import { WindowUtils } from '../utils/WindowUtils';
import { AppConfig } from '../utils/AppConfig';

@Entry
@ComponentV2
struct Index {
  // 获取上下文
  context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
  // 连接到存储
  @Local prop: MainStat = AppStorageV2.connect(MainStat, () => new MainStat())!;
  @Local flag:number = 0;
  pageInfos: NavPathStack = new NavPathStack();

  private countCategory: number = -1;
  private countChild: number = -1;

  // 设置对话框控制器
  settingController: CustomDialogController | null = new CustomDialogController({
    builder: SettingDialog({
      onPressAddChildren: () => {
        this.pageInfos.pushPathByName('addChild', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            this.loadChild();
          }
        });
        this.settingController?.close();
      },
      onPressCategoryManage: () => {
        this.pageInfos.pushPathByName('addCategory', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            this.loadCategory();
          }
        });
        this.settingController?.close();
      },
      onPressAlbumManage: () => {
        this.pageInfos.pushPathByName('addAlbum', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            this.loadAlbums();
          }
        });
        this.settingController?.close();
      },
    }),
    cancel: () => {},
    autoCancel: true,
    alignment: DialogAlignment.Center,
    offset: { dx: 0, dy: 0 },
    customStyle: false,
    cornerRadius: 10,
    width: '60%'
  });

  // 构建设置菜单
  @Builder
  SettingMenuBuilder() {
    Menu() {
      MenuItem({ startIcon: $r("app.media.children"), content: "孩子" }).onClick(() => {
        this.pageInfos.pushPathByName('listChild', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            // 添加必要的逻辑
          }
        });
      });
      MenuItem({ startIcon: $r("app.media.category"), content: "分类" }).onClick(() => {
        this.pageInfos.pushPathByName('listCategory', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            // 添加必要的逻辑
          }
        });
      });
      MenuItem({ startIcon: $r("app.media.album"), content: "画册" }).onClick(() => {
        this.pageInfos.pushPathByName('listAlbum', null, (popInfo: PopInfo) => {
          if ((popInfo.result as resultClass).count == 1) {
            // 添加必要的逻辑
          }
        });
      });
    }
  }

  // 构建导航标题
  @Builder NavigationTitle() {
    Column() {
      Row() {
        Text('小小画廊')
          .fontSize(30)
          .lineHeight(30)
          .fontWeight(700);

        Button({ buttonStyle: ButtonStyleMode.TEXTUAL, role: ButtonRole.NORMAL, type: ButtonType.Circle, stateEffect: true }) {
          Image($r('app.media.gears')).width(22).height(22)
        }
        .width(40)
        .height(40)
        .margin({ left: 10 })
        .bindMenu(this.SettingMenuBuilder)
      }
    }
    .justifyContent(FlexAlign.Center)
    .alignItems(HorizontalAlign.Start)
    .height('100%')
    .width('70%')
    .padding({ left: 16 });
  }

  // 加载数据
 async  loadData() {
   await this.loadCategory();
    await this.loadChild();
    await this.loadAlbums();
  }

 async generateDefaultData(){
    if(this.countCategory==0&&this.countChild==0&&AppConfig.isDefaultData){
      console.log('littleGallery', 'generate default data');
      promptAction.showToast({
        message: '生成默认数据中，请稍后...',
        duration: 2000
      })
      await CoreService.getService().generateDefaultData();
      promptAction.showToast({
        message: '生成默认数据完成',
        duration: 2000
      })
      this.loadData();
    }
  }

  // 加载画册
  loadAlbums() {
    CoreService.getService().getMyAlbums().then((albums) => {
      console.log('littleGallery', 'getMyAlbums', JSON.stringify(albums));
      this.prop.albums = albums;
    });
  }

  // 加载孩子信息
  loadChild() {
    CoreService.getService().getMyChild().then((child) => {
      console.log('littleGallery', 'getMyChild', JSON.stringify(child));
      this.prop.child = child;
      if(child.length == 0&&AppConfig.isDefaultData) {
        this.countChild = child.length;
        this.generateDefaultData();
      }
    });
  }

  // 加载分类
  loadCategory() {
    CoreService.getService().getMyCategory().then((categories) => {
      console.log('littleGallery', 'getMyCategory', JSON.stringify(categories));
      this.prop.categories = categories;
      if(categories.length == 0&&AppConfig.isDefaultData) {
        this.countCategory = categories.length;
        this.generateDefaultData();
      }
    });
  }

  // 用户登录
  async signIn() {
    console.log('littleGallery', 'signIn');
    auth.getCurrentUser().then(async (user) => {
      if (user) {
        hilog.info(0x0000, 'littleGallery', user?.getUid());
        let extra = await user?.getUserExtra();
        console.log('littleGallery', extra.getCreateTime(), extra.getLastSignInTime());
        this.prop.userId = user?.getUid()!;
        let provider = auth.getAuthProvider();
        console.log('littleGallery', JSON.stringify(provider));
        cloudCommon.init({ authProvider: provider });
        CoreService.getService().setUserId(this.prop.userId);
        this.loadData();
      } else {
        auth.signIn({
          autoCreateUser: true,
          "credentialInfo": {
            "kind": "hwid"
          }
        })
        .then(signInResult => {
          this.prop.userId = signInResult?.getUser().getUid();
          console.log('littleGallery', JSON.stringify(signInResult));
          let provider = auth.getAuthProvider();
          console.log('littleGallery', JSON.stringify(provider));
          cloudCommon.init({ authProvider: provider });
          CoreService.getService().setUserId(this.prop.userId);
          this.loadData();
        })
        .catch((error2: BusinessError) => {
          console.log('littleGallery', JSON.stringify(error2));
        });
      }
    }).catch(async (e: ESObject) => {
      console.log('littleGallery', 'getCurrentUser', JSON.stringify(e));
    });
  }

  // 页面出现时调用
  aboutToAppear(): void {
    this.signIn();
  }

  // 构建项目头部
  @Builder itemHead(text: string) {
    Text(text)
      .fontSize(18)
      .fontColor($r('sys.color.font_secondary'))
      .opacity(0.6)
      .width('100%')
      .padding({ left: 16, top: 4, bottom: 4 })
      .margin({ bottom: 4 });
  }

  // 添加分类
  @Builder addCategory() {
    Button('添加分类', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL })
      .fontColor($r('sys.color.font_secondary'))
      .onClick(()=>{
          this.pageInfos.pushPathByName('addCategory', null, (popInfo: PopInfo) => {
            if ((popInfo.result as resultClass).count == 1) {
              this.loadCategory();
            }
          });
      }).height(30)
      .margin({left:10,right:10,top:20,bottom:8}).opacity(0.2)
  }

  // 构建菜单
  @Builder
  MenuBuilder() {
    Menu() {
      MenuItem({ startIcon: $r("app.media.pen"), content: "编辑" })
      MenuItem({ startIcon: $r("app.media.trash"), content: "删除" })
    }
  }

  // 构建页面
  build() {
    Stack({ alignContent: Alignment.Bottom }) {
      Column() {
        Navigation(this.pageInfos) {
          Column() {
            List() {
              ForEach([...this.prop.categories, new Category()], (itemGroup: Category) => {
                if (itemGroup.id == null) {
                  ListItem() {
                    this.addCategory();
                  }
                } else {
                  ListItemGroup({ header: this.itemHead(itemGroup.name), space: 4 }) {
                    ForEach(this.chunkArray([
                      ...this.prop.albums.filter(album => album.categoryId === itemGroup.id),
                      new Album()
                    ], 2), (chunk: Album[]) => {
                      ListItem() {
                        Row({space:8}) {
                          ForEach(chunk, (item: Album) => {
                            if (item.id == null) {
                              Button('添加画册', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL })
                                .fontColor($r('sys.color.font_secondary'))
                                .onClick(()=>{
                                    this.pageInfos.pushPathByName('addAlbum', {"categoryId":itemGroup.id}, (popInfo:PopInfo) => {
                                      if ((popInfo.result as resultClass).count == 1) {
                                        this.loadAlbums();
                                      }
                                    });
                                }).height(30)
                                .margin({top:8,bottom:8}).opacity(0.2)
                            } else {
                              AlbumItem({
                                item:item,
                                maxWidth: (px2vp(WindowUtils.windowWidth_px)-16-8) / 2,
                                onGoDetail:(e:Album)=>{
                                this.pageInfos.pushPathByName('albumDetail', e);
                              }})
                            }
                          });
                        }
                        .width('100%')
                        .justifyContent(FlexAlign.Start).alignItems(VerticalAlign.Bottom);
                      }
                      .padding({ left: 8, right: 8 });
                    });
                  }
                }
              }, (itemGroup: Category) => itemGroup.id);
            }
            .sticky(StickyStyle.Header)
            .scrollBar(BarState.Auto)
            .edgeEffect(EdgeEffect.Spring);
          }
          .justifyContent(FlexAlign.Start)
          .height('100%');
        }
        .title({
          builder: this.NavigationTitle,
          height: 60
        })
        .titleMode(NavigationTitleMode.Free)
        .mode(NavigationMode.Stack);
      }
      .height('100%')
      .width('100%')
      .backgroundColor($r('app.color.start_window_background'));
    }
  }

  // 构建调试页面
  @Builder
  buildDebug() {
    Column({ space: 20 }) {
      Button('addChild', { type: ButtonType.Normal, stateEffect: true })
        .borderRadius(8)
        .backgroundColor(0x317aff)
        .height(40)
        .onClick(() => {
          this.pageInfos.pushPathByName('addChild', null);
        });
      Button('addCategory', { type: ButtonType.Normal, stateEffect: true })
        .borderRadius(8)
        .backgroundColor(0x317aff)
        .height(40)
        .onClick(() => {
          this.pageInfos.pushPathByName('addCategory', null);
        });
      Button('addAlbum', { type: ButtonType.Normal, stateEffect: true })
        .borderRadius(8)
        .backgroundColor(0x317aff)
        .height(40)
        .onClick(() => {
          this.pageInfos.pushPathByName('addAlbum', null);
        });
      Button('addPicture', { type: ButtonType.Normal, stateEffect: true })
        .borderRadius(8)
        .backgroundColor(0x317aff)
        .height(40)
        .onClick(() => {
          this.pageInfos.pushPathByName('addPicture', null);
        });
      Button('华为账号登录', { type: ButtonType.Normal, stateEffect: true })
        .borderRadius(8)
        .backgroundColor(0x317aff)
        .height(40)
        .onClick(() => {
          this.signIn();
        });
      Button('退出登录', { type: ButtonType.Normal, stateEffect: true })
        .borderRadius(8)
        .backgroundColor(0x317aff)
        .height(40)
        .onClick(async () => {
          await auth.signOut();
        });
    }
  }

  // 将数组分块
  chunkArray<T>(array: T[], size: number): T[][] {
    const chunked: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunked.push(array.slice(i, i + size));
    }
    return chunked;
  }
}