if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import auth from "@normalized:N&&&@hw-agconnect/auth/Index&1.0.2";
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import cloudCommon from "@hms:core.deviceCloudGateway.cloudCommon";
import { MainStat } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import type { resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import CoreService from "@normalized:N&&&entry/src/main/ets/services/CoreService&";
import SettingDialog from "@normalized:N&&&entry/src/main/ets/components/SettingDialog&";
import type common from "@ohos:app.ability.common";
import { Album } from "@normalized:N&&&entry/src/main/ets/module/Album&";
import { Category } from "@normalized:N&&&entry/src/main/ets/module/Category&";
import { AlbumItem } from "@normalized:N&&&entry/src/main/ets/components/AlbumItem&";
import { WindowUtils } from "@normalized:N&&&entry/src/main/ets/utils/WindowUtils&";
import { AppConfig } from "@normalized:N&&&entry/src/main/ets/utils/AppConfig&";
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.context = getContext(this) as common.UIAbilityContext;
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.flag = 0;
        this.pageInfos = new NavPathStack();
        this.countCategory = -1;
        this.countChild = -1;
        this.settingController = new CustomDialogController({
            builder: () => {
                let jsDialog = new SettingDialog(this, {
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
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 48, col: 14 });
                jsDialog.setController(this.
                // 设置对话框控制器
                settingController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
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
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            cancel: () => { },
            autoCancel: true,
            alignment: DialogAlignment.Center,
            offset: { dx: 0, dy: 0 },
            customStyle: false,
            cornerRadius: 10,
            width: '60%'
        }, this);
        this.finalizeConstruction();
    }
    // 获取上下文
    context: common.UIAbilityContext;
    // 连接到存储
    @Local
    prop: MainStat;
    @Local
    flag: number;
    pageInfos: NavPathStack;
    private countCategory: number;
    private countChild: number;
    // 设置对话框控制器
    settingController: CustomDialogController | null;
    // 构建设置菜单
    SettingMenuBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777304, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "孩子" });
            MenuItem.onClick(() => {
                this.pageInfos.pushPathByName('listChild', null, (popInfo: PopInfo) => {
                    if ((popInfo.result as resultClass).count == 1) {
                        // 添加必要的逻辑
                    }
                });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777303, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "分类" });
            MenuItem.onClick(() => {
                this.pageInfos.pushPathByName('listCategory', null, (popInfo: PopInfo) => {
                    if ((popInfo.result as resultClass).count == 1) {
                        // 添加必要的逻辑
                    }
                });
            });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777300, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "画册" });
            MenuItem.onClick(() => {
                this.pageInfos.pushPathByName('listAlbum', null, (popInfo: PopInfo) => {
                    if ((popInfo.result as resultClass).count == 1) {
                        // 添加必要的逻辑
                    }
                });
            });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    // 构建导航标题
    NavigationTitle(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Center);
            Column.alignItems(HorizontalAlign.Start);
            Column.height('100%');
            Column.width('70%');
            Column.padding({ left: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('小小画廊');
            Text.fontSize(30);
            Text.lineHeight(30);
            Text.fontWeight(700);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ buttonStyle: ButtonStyleMode.TEXTUAL, role: ButtonRole.NORMAL, type: ButtonType.Circle, stateEffect: true });
            Button.width(40);
            Button.height(40);
            Button.margin({ left: 10 });
            Button.bindMenu({ builder: this.SettingMenuBuilder.bind(this) });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777307, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Image.width(22);
            Image.height(22);
        }, Image);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    // 加载数据
    async loadData() {
        await this.loadCategory();
        await this.loadChild();
        await this.loadAlbums();
    }
    async generateDefaultData() {
        if (this.countCategory == 0 && this.countChild == 0 && AppConfig.isDefaultData) {
            console.log('littleGallery', 'generate default data');
            promptAction.showToast({
                message: '生成默认数据中，请稍后...',
                duration: 2000
            });
            await CoreService.getService().generateDefaultData();
            promptAction.showToast({
                message: '生成默认数据完成',
                duration: 2000
            });
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
            if (child.length == 0 && AppConfig.isDefaultData) {
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
            if (categories.length == 0 && AppConfig.isDefaultData) {
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
            }
            else {
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
        }).catch(async (e: any) => {
            console.log('littleGallery', 'getCurrentUser', JSON.stringify(e));
        });
    }
    // 页面出现时调用
    aboutToAppear(): void {
        this.signIn();
    }
    // 构建项目头部
    itemHead(text: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.fontSize(18);
            Text.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Text.opacity(0.6);
            Text.width('100%');
            Text.padding({ left: 16, top: 4, bottom: 4 });
            Text.margin({ bottom: 4 });
        }, Text);
        Text.pop();
    }
    // 添加分类
    addCategory(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加分类', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL });
            Button.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addCategory', null, (popInfo: PopInfo) => {
                    if ((popInfo.result as resultClass).count == 1) {
                        this.loadCategory();
                    }
                });
            });
            Button.height(30);
            Button.margin({ left: 10, right: 10, top: 20, bottom: 8 });
            Button.opacity(0.2);
        }, Button);
        Button.pop();
    }
    // 构建菜单
    MenuBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777324, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "编辑" });
        }, MenuItem);
        MenuItem.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777327, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "删除" });
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    // 构建页面
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Bottom });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height('100%');
            Column.width('100%');
            Column.backgroundColor({ "id": 16777293, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageInfos, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.title({
                builder: this.NavigationTitle.bind(this),
                height: 60
            });
            Navigation.titleMode(NavigationTitleMode.Free);
            Navigation.mode(NavigationMode.Stack);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.justifyContent(FlexAlign.Start);
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.sticky(StickyStyle.Header);
            List.scrollBar(BarState.Auto);
            List.edgeEffect(EdgeEffect.Spring);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const itemGroup = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (itemGroup.id == null) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    itemCreation2(elmtId, isInitialRender);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.addCategory.bind(this)();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ListItemGroup.create({ header: this.itemHead.bind(this, itemGroup.name), space: 4 });
                            }, ListItemGroup);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const chunk = _item;
                                    {
                                        const itemCreation = (elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            itemCreation2(elmtId, isInitialRender);
                                            if (!isInitialRender) {
                                                ListItem.pop();
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        };
                                        const itemCreation2 = (elmtId, isInitialRender) => {
                                            ListItem.create(deepRenderFunction, true);
                                            ListItem.padding({ left: 8, right: 8 });
                                        };
                                        const deepRenderFunction = (elmtId, isInitialRender) => {
                                            itemCreation(elmtId, isInitialRender);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Row.create({ space: 8 });
                                                Row.width('100%');
                                                Row.justifyContent(FlexAlign.Start);
                                                Row.alignItems(VerticalAlign.Bottom);
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                ForEach.create();
                                                const forEachItemGenFunction = _item => {
                                                    const item = _item;
                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                        If.create();
                                                        if (item.id == null) {
                                                            this.ifElseBranchUpdateFunction(0, () => {
                                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                                    Button.createWithLabel('添加画册', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL });
                                                                    Button.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                                                    Button.onClick(() => {
                                                                        this.pageInfos.pushPathByName('addAlbum', { "categoryId": itemGroup.id }, (popInfo: PopInfo) => {
                                                                            if ((popInfo.result as resultClass).count == 1) {
                                                                                this.loadAlbums();
                                                                            }
                                                                        });
                                                                    });
                                                                    Button.height(30);
                                                                    Button.margin({ top: 8, bottom: 8 });
                                                                    Button.opacity(0.2);
                                                                }, Button);
                                                                Button.pop();
                                                            });
                                                        }
                                                        else {
                                                            this.ifElseBranchUpdateFunction(1, () => {
                                                                {
                                                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                                        if (isInitialRender) {
                                                                            let componentCall = new AlbumItem(this, {
                                                                                item: item,
                                                                                maxWidth: (px2vp(WindowUtils.windowWidth_px) - 16 - 8) / 2,
                                                                                onGoDetail: (e: Album) => {
                                                                                    this.pageInfos.pushPathByName('albumDetail', e);
                                                                                }
                                                                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 302, col: 31 });
                                                                            ViewV2.create(componentCall);
                                                                            let paramsLambda = () => {
                                                                                return {
                                                                                    item: item,
                                                                                    maxWidth: (px2vp(WindowUtils.windowWidth_px) - 16 - 8) / 2,
                                                                                    onGoDetail: (e: Album) => {
                                                                                        this.pageInfos.pushPathByName('albumDetail', e);
                                                                                    }
                                                                                };
                                                                            };
                                                                            componentCall.paramsGenerator_ = paramsLambda;
                                                                        }
                                                                        else {
                                                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                                                item: item,
                                                                                maxWidth: (px2vp(WindowUtils.windowWidth_px) - 16 - 8) / 2,
                                                                                onGoDetail: (e: Album) => {
                                                                                    this.pageInfos.pushPathByName('albumDetail', e);
                                                                                }
                                                                            });
                                                                        }
                                                                    }, { name: "AlbumItem" });
                                                                }
                                                            });
                                                        }
                                                    }, If);
                                                    If.pop();
                                                };
                                                this.forEachUpdateFunction(elmtId, chunk, forEachItemGenFunction);
                                            }, ForEach);
                                            ForEach.pop();
                                            Row.pop();
                                            ListItem.pop();
                                        };
                                        this.observeComponentCreation2(itemCreation2, ListItem);
                                        ListItem.pop();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.chunkArray([
                                    ...this.prop.albums.filter(album => album.categoryId === itemGroup.id),
                                    new Album()
                                ], 2), forEachItemGenFunction);
                            }, ForEach);
                            ForEach.pop();
                            ListItemGroup.pop();
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, [...this.prop.categories, new Category()], forEachItemGenFunction, (itemGroup: Category) => itemGroup.id, false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
        Column.pop();
        Navigation.pop();
        Column.pop();
        Stack.pop();
    }
    // 构建调试页面
    buildDebug(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('addChild', { type: ButtonType.Normal, stateEffect: true });
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.height(40);
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addChild', null);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('addCategory', { type: ButtonType.Normal, stateEffect: true });
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.height(40);
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addCategory', null);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('addAlbum', { type: ButtonType.Normal, stateEffect: true });
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.height(40);
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addAlbum', null);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('addPicture', { type: ButtonType.Normal, stateEffect: true });
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.height(40);
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addPicture', null);
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('华为账号登录', { type: ButtonType.Normal, stateEffect: true });
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.height(40);
            Button.onClick(() => {
                this.signIn();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('退出登录', { type: ButtonType.Normal, stateEffect: true });
            Button.borderRadius(8);
            Button.backgroundColor(0x317aff);
            Button.height(40);
            Button.onClick(async () => {
                await auth.signOut();
            });
        }, Button);
        Button.pop();
        Column.pop();
    }
    // 将数组分块
    chunkArray<T>(array: T[], size: number): T[][] {
        const chunked: T[][] = [];
        for (let i = 0; i < array.length; i += size) {
            chunked.push(array.slice(i, i + size));
        }
        return chunked;
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
