if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import CoreService from "@normalized:N&&&entry/src/main/ets/services/CoreService&";
import type { Album } from '../module/Album';
// 页面构建器
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new ListAlbum(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListAlbum.ets", line: 25, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "ListAlbum" });
    }
}
class ListAlbum extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.flag = 1;
        this.toDelId = '';
        this.pageInfos = new NavPathStack();
        this.finalizeConstruction();
    }
    // 本地属性，连接到 MainStat
    @Local
    prop: MainStat;
    @Local
    flag: number;
    toDelId;
    pageInfos: NavPathStack;
    // 页面出现时加载相册
    aboutToAppear() {
        this.loadAlbums();
    }
    // 强制重新加载
    forceReload() {
        this.flag++;
    }
    // 加载相册
    loadAlbums() {
        CoreService.getService().getMyAlbums().then((albums) => {
            console.log('littleGallery', 'getMyAlbums', JSON.stringify(albums));
            this.prop.albums = albums;
            this.forceReload();
        });
    }
    // 添加相册按钮
    addAlbumButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加新画册', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL });
            Button.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addAlbum', null, (popInfo: PopInfo) => {
                    if ((popInfo.result as resultClass).count == 1) {
                        this.loadAlbums();
                    }
                });
            });
        }, Button);
        Button.pop();
    }
    // 删除相册
    async deleteAlbum(id: string) {
        let succ = await CoreService.getService().deleteAlbum(id);
        if (succ) {
            promptAction.showToast({
                message: '删除成功 ' + id,
                duration: 2000
            });
            this.loadAlbums();
        }
        else {
            promptAction.showToast({
                message: '有关联的照片，无法删除！',
                duration: 2000
            });
        }
        this.toDelId = '';
    }
    // 删除菜单构建器
    DeleteMenuBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777327, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "确认删除" });
            MenuItem.onClick(() => {
                this.deleteAlbum(this.toDelId);
            });
            MenuItem.foregroundColor(Color.Red);
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    // 构建页面
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.prop.albums.length == 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.width('100%');
                                Column.height('100%');
                                Column.justifyContent(FlexAlign.Center);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create({ space: 20 });
                                Column.padding({ bottom: 200 });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777300, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                Image.width(200);
                                Image.height(200);
                                Image.opacity(0.6);
                            }, Image);
                            this.addAlbumButton.bind(this)();
                            Column.pop();
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                List.create({ space: 16, initialIndex: 0 });
                                List.width('90%');
                                List.scrollBar(BarState.Off);
                            }, List);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                ForEach.create();
                                const forEachItemGenFunction = _item => {
                                    const album = _item;
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
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Row.create({ space: 16 });
                                                Row.width('100%');
                                                Row.padding({ top: 8, bottom: 8, left: 16, right: 16 });
                                                Row.justifyContent(FlexAlign.SpaceBetween);
                                                Row.borderRadius(10);
                                                Row.backgroundColor({ "id": 125833506, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Row.create();
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Column.create({ space: 2 });
                                                Column.alignItems(HorizontalAlign.Start);
                                            }, Column);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(album.name);
                                                Text.fontSize(16);
                                            }, Text);
                                            Text.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(album.description || '暂无描述');
                                                Text.fontSize(12);
                                                Text.opacity(0.6);
                                            }, Text);
                                            Text.pop();
                                            Column.pop();
                                            Row.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Row.create({ space: 8 });
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Button.createWithChild({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL });
                                                Button.width(36);
                                                Button.height(36);
                                                Button.onClick(() => {
                                                    this.pageInfos.pushPathByName('addAlbum', album, (popInfo: PopInfo) => {
                                                        if ((popInfo.result as resultClass).count == 1) {
                                                            this.loadAlbums();
                                                        }
                                                    });
                                                });
                                            }, Button);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Image.create({ "id": 16777324, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                                Image.width(15);
                                                Image.height(15);
                                            }, Image);
                                            Button.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Button.createWithChild({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL });
                                                Button.width(36);
                                                Button.height(36);
                                                Button.onClick(() => this.toDelId = album.id);
                                                Button.bindMenu({ builder: this.DeleteMenuBuilder.bind(this) });
                                            }, Button);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Image.create({ "id": 16777327, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                                Image.width(15);
                                                Image.height(15);
                                            }, Image);
                                            Button.pop();
                                            Row.pop();
                                            Row.pop();
                                            ListItem.pop();
                                        };
                                        this.observeComponentCreation2(itemCreation2, ListItem);
                                        ListItem.pop();
                                    }
                                };
                                this.forEachUpdateFunction(elmtId, this.prop.albums, forEachItemGenFunction, (album: Album) => `${album.id}-${this.flag}`, false, false);
                            }, ForEach);
                            ForEach.pop();
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
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Column.create();
                                        Column.width('100%');
                                    }, Column);
                                    this.addAlbumButton.bind(this)();
                                    Column.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                            List.pop();
                        });
                    }
                }, If);
                If.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ListAlbum" });
            NavDestination.title('画册');
            NavDestination.onBackPressed(() => {
                this.pageInfos.pop(new resultClass(0));
                return true;
            });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "ListAlbum";
    }
}
registerNamedRoute(() => new ListAlbum(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/ListAlbum", pageFullPath: "entry/src/main/ets/pages/ListAlbum", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("listAlbum", wrapBuilder(PageBuilder));
    }
})();
