if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import CoreService from "@normalized:N&&&entry/src/main/ets/services/CoreService&";
import type { Category } from '../module/Category';
// 页面构建器
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new ListCategory(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListCategory.ets", line: 25, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "ListCategory" });
    }
}
class ListCategory extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.flag = 1;
        this.toDelId = '';
        this.pageInfos = new NavPathStack();
        this.finalizeConstruction();
    }
    // 本地属性，连接到应用存储
    @Local
    prop: MainStat;
    @Local
    flag: number;
    toDelId;
    pageInfos: NavPathStack;
    // 页面即将出现时加载分类
    aboutToAppear() {
        this.loadCategories();
    }
    // 强制重新加载
    forceReload() {
        this.flag++;
    }
    // 加载分类
    loadCategories() {
        CoreService.getService().getMyCategory().then((categories) => {
            console.log('littleGallery', 'getMyCategory', JSON.stringify(categories));
            this.prop.categories = categories;
            this.forceReload();
        });
    }
    // 添加分类按钮构建器
    addCategoryButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加新分类', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL });
            Button.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addCategory', null, (popInfo: PopInfo) => {
                    if ((popInfo.result as resultClass).count == 1) {
                        this.loadCategories();
                    }
                });
            });
        }, Button);
        Button.pop();
    }
    // 删除分类
    async deleteCategory(id: string) {
        let succ = await CoreService.getService().deleteCategory(id);
        if (succ) {
            promptAction.showToast({
                message: '删除成功 ' + id,
                duration: 2000
            });
            this.loadCategories();
        }
        else {
            promptAction.showToast({
                message: '有关联的相册，无法删除！',
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
                this.deleteCategory(this.toDelId);
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
                    if (this.prop.categories.length == 0) {
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
                                Image.create({ "id": 16777303, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                Image.width(200);
                                Image.height(200);
                                Image.opacity(0.6);
                            }, Image);
                            this.addCategoryButton.bind(this)();
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
                                    const category = _item;
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
                                                Column.create({ space: 2 });
                                                Column.alignItems(HorizontalAlign.Start);
                                            }, Column);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(category.name);
                                                Text.fontSize(16);
                                            }, Text);
                                            Text.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(category.description || '暂无描述');
                                                Text.fontSize(12);
                                                Text.opacity(0.6);
                                            }, Text);
                                            Text.pop();
                                            Column.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Row.create({ space: 8 });
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Button.createWithChild({ type: ButtonType.Circle, stateEffect: true, buttonStyle: ButtonStyleMode.TEXTUAL });
                                                Button.width(36);
                                                Button.height(36);
                                                Button.onClick(() => {
                                                    this.pageInfos.pushPathByName('addCategory', category, (popInfo: PopInfo) => {
                                                        if ((popInfo.result as resultClass).count == 1) {
                                                            this.loadCategories();
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
                                                Button.onClick(() => this.toDelId = category.id);
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
                                this.forEachUpdateFunction(elmtId, this.prop.categories, forEachItemGenFunction, (category: Category) => `${category.id}-${this.flag}`, false, false);
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
                                    this.addCategoryButton.bind(this)();
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
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ListCategory" });
            NavDestination.title('分类');
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
        return "ListCategory";
    }
}
registerNamedRoute(() => new ListCategory(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/ListCategory", pageFullPath: "entry/src/main/ets/pages/ListCategory", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("listCategory", wrapBuilder(PageBuilder));
    }
})();
