if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
import type { Child } from "../module/Child";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import CoreService from "@normalized:N&&&entry/src/main/ets/services/CoreService&";
import { AppConfig } from "@normalized:N&&&entry/src/main/ets/utils/AppConfig&";
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new ListChild(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ListChild.ets", line: 27, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "ListChild" });
    }
}
class ListChild extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.flag = 1;
        this.toDelId = '';
        this.pageInfos = new NavPathStack();
        this.agcDataBase = undefined;
        this.finalizeConstruction();
    }
    @Local
    prop: MainStat;
    @Local
    flag: number;
    toDelId;
    pageInfos: NavPathStack;
    agcDataBase: cloudDatabase.DatabaseZone | undefined;
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
    forceReload() {
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
    addChildButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加孩子按钮
            Button.createWithLabel('添加您的孩子', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL });
            // 添加孩子按钮
            Button.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            // 添加孩子按钮
            Button.onClick(() => {
                this.pageInfos.pushPathByName('addChild', null, (popInfo: PopInfo) => {
                    if ((popInfo.result as resultClass).count == 1) {
                        this.loadChild();
                    }
                });
            });
        }, Button);
        // 添加孩子按钮
        Button.pop();
    }
    // 根据ID删除孩子
    async deleteChild(id: string) {
        let succ = await CoreService.getService().deleteChild(id);
        if (succ) {
            promptAction.showToast({
                message: '删除成功 ' + id,
                duration: 2000
            });
            this.loadChild();
        }
        else {
            promptAction.showToast({
                message: '有关联的记录，无法删除！',
                duration: 2000
            });
        }
        this.toDelId = '';
    }
    DeleteMenuBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 删除菜单构建器
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777327, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "确认删除" });
            MenuItem.onClick(() => {
                this.deleteChild(this.toDelId);
            });
            MenuItem.foregroundColor(Color.Red);
        }, MenuItem);
        MenuItem.pop();
        // 删除菜单构建器
        Menu.pop();
    }
    // 构建UI
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.prop.child.length == 0) {
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
                                Image.create({ "id": 16777309, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                Image.width(160);
                                Image.height(160);
                                Image.opacity(0.6);
                            }, Image);
                            this.addChildButton.bind(this)();
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
                                    const child = _item;
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
                                                Row.create();
                                            }, Row);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                If.create();
                                                if (child.gender == '男孩') {
                                                    this.ifElseBranchUpdateFunction(0, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Image.create({ "id": 16777302, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                                            Image.width(30);
                                                            Image.height(30);
                                                            Image.opacity(0.6);
                                                        }, Image);
                                                    });
                                                }
                                                else {
                                                    this.ifElseBranchUpdateFunction(1, () => {
                                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                            Image.create({ "id": 16777308, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                                            Image.width(30);
                                                            Image.height(30);
                                                            Image.opacity(0.6);
                                                        }, Image);
                                                    });
                                                }
                                            }, If);
                                            If.pop();
                                            Row.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Column.create({ space: 2 });
                                                Column.alignItems(HorizontalAlign.Start);
                                            }, Column);
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(child.name);
                                                Text.fontSize(16);
                                            }, Text);
                                            Text.pop();
                                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                Text.create(this.calculateAge(child.birthday) + '岁');
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
                                                    this.pageInfos.pushPathByName('addChild', child, (popInfo: PopInfo) => {
                                                        if ((popInfo.result as resultClass).count == 1) {
                                                            this.loadChild();
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
                                                Button.onClick(() => this.toDelId = child.id);
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
                                this.forEachUpdateFunction(elmtId, this.prop.child, forEachItemGenFunction, (child: Child) => `${child.id}-${this.flag}`, false, false);
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
                                    this.addChildButton.bind(this)();
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
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ListChild" });
            NavDestination.title('孩子');
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
        return "ListChild";
    }
}
registerNamedRoute(() => new ListChild(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/ListChild", pageFullPath: "entry/src/main/ets/pages/ListChild", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("listChild", wrapBuilder(PageBuilder));
    }
})();
