if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
import { Child } from "@normalized:N&&&entry/src/main/ets/module/Child&";
import util from "@ohos:util";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import { AppConfig } from "@normalized:N&&&entry/src/main/ets/utils/AppConfig&";
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new AddChild(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AddChild.ets", line: 26, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "AddChild" });
    }
}
class AddChild extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.pageInfos = new NavPathStack();
        this.gender = "男孩" // 默认性别为男孩
        ;
        this.index = 0;
        this.name = "" // 存储孩子的姓名
        ;
        this.birthday = new Date(new Date().setFullYear(new Date().getFullYear() - 5)) // 默认生日为5年前
        ;
        this.childId = "";
        this.agcDataBase = undefined;
        this.finalizeConstruction();
    }
    @Local
    prop: MainStat;
    pageInfos: NavPathStack;
    @Local
    gender: string; // 默认性别为男孩
    @Local
    index: number;
    @Local
    name: string; // 存储孩子的姓名
    @Local
    birthday: Date; // 默认生日为5年前
    childId; // 孩子的ID
    agcDataBase: cloudDatabase.DatabaseZone | undefined;
    aboutToAppear() {
        this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);
        setTimeout(async () => {
            let child = this.pageInfos.getParamByName('addChild')[0] as Child;
            this.name = child.name;
            this.birthday = child.birthday;
            this.gender = child.gender;
            if (child.gender == '女孩') {
                this.index = 1;
            }
            this.childId = child.id;
        }, 100);
    }
    async onSave() {
        // 保存孩子信息
        if (this.name.length == 0) {
            promptAction.showToast({
                message: '请输入姓名',
                duration: 2000
            });
            return;
        }
        if (this.birthday > new Date()) {
            promptAction.showToast({
                message: '生日不能大于当前日期',
                duration: 2000
            });
            return;
        }
        try {
            let child = new Child();
            child.id = this.childId == "" ? util.generateRandomUUID(true) : this.childId;
            child.userId = this.prop.userId;
            child.name = this.name;
            child.birthday = this.birthday;
            child.gender = this.gender;
            await this.agcDataBase?.upsert(child);
            promptAction.showToast({
                message: '保存成功',
                duration: 2000
            });
            this.pageInfos.pop(new resultClass(1));
        }
        catch (err) {
            console.log('littleGallery', 'onSave', err);
            promptAction.showToast({
                message: '保存失败',
                duration: 2000
            });
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 8 });
                    Column.width('100%');
                    Column.height('100%');
                    Column.padding({ left: 20, right: 20, top: 20 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(40);
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('姓名');
                    Text.width('20%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入', text: this.name });
                    TextInput.width('70%');
                    TextInput.textAlign(TextAlign.End);
                    TextInput.backgroundColor(Color.Transparent);
                    TextInput.onChange((value) => {
                        this.name = value;
                    });
                }, TextInput);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                }, Divider);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(40);
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('生日');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    CalendarPicker.create({ selected: this.birthday });
                    CalendarPicker.onChange((value: Date) => {
                        this.birthday = value;
                    });
                }, CalendarPicker);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                }, Divider);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(40);
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ bottom: 8 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('性别');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create([{ value: '男孩' }, { value: '女孩' }]);
                    Select.selected(this.index);
                    Select.value(this.gender);
                    Select.onSelect((index: number, text?: string | undefined) => {
                        this.index = index;
                        if (text) {
                            this.gender = text;
                        }
                    });
                }, Select);
                Select.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                }, Divider);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('100%');
                    Row.height(40);
                    Row.justifyContent(FlexAlign.SpaceBetween);
                    Row.margin({ top: 20 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel('保存', { type: ButtonType.Normal, stateEffect: true });
                    Button.borderRadius(8);
                    Button.width('100%');
                    Button.onClick(() => {
                        this.onSave();
                    });
                }, Button);
                Button.pop();
                Row.pop();
                Column.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AddChild" });
            NavDestination.title('添加您的孩子');
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
        return "AddChild";
    }
}
registerNamedRoute(() => new AddChild(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/AddChild", pageFullPath: "entry/src/main/ets/pages/AddChild", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("addChild", wrapBuilder(PageBuilder));
    }
})();
