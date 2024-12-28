if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
import util from "@ohos:util";
import { Category } from "@normalized:N&&&entry/src/main/ets/module/Category&";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import { AppConfig } from "@normalized:N&&&entry/src/main/ets/utils/AppConfig&";
// 页面构建器
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new AddCategory(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AddCategory.ets", line: 27, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "AddCategory" });
    }
}
class AddCategory extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.description = '';
        this.name = '';
        this.categoryId = '';
        this.createTime = new Date();
        this.pageInfos = new NavPathStack();
        this.agcDataBase = undefined;
        this.finalizeConstruction();
    }
    // 本地存储属性
    @Local
    prop: MainStat;
    @Local
    description: string;
    @Local
    name: string;
    categoryId: string;
    createTime: Date;
    pageInfos: NavPathStack;
    agcDataBase: cloudDatabase.DatabaseZone | undefined;
    // 页面即将出现时的生命周期方法
    aboutToAppear() {
        this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);
        setTimeout(async () => {
            let category = this.pageInfos.getParamByName('addCategory')[0] as Category;
            this.name = category.name;
            this.description = category.description;
            this.categoryId = category.id;
            this.createTime = category.createTime;
        }, 100);
    }
    // 保存按钮的点击事件处理
    async onSave() {
        if (this.name.length == 0) {
            promptAction.showToast({
                message: '请输入分类名称',
                duration: 2000
            });
            return;
        }
        try {
            const category = new Category();
            category.id = this.categoryId == '' ? util.generateRandomUUID(true) : this.categoryId;
            category.userId = this.prop.userId;
            category.name = this.name;
            category.description = this.description;
            category.createTime = this.createTime;
            await this.agcDataBase?.upsert(category);
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
    // 构建UI界面
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
                    Text.create('分类名称');
                    Text.width('20%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextInput.create({ placeholder: '请输入', text: this.name });
                    TextInput.width('70%');
                    TextInput.textAlign(TextAlign.End);
                    TextInput.backgroundColor(Color.Transparent);
                    TextInput.onChange((value: string) => {
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
                    Column.create({ space: 8 });
                    Column.alignItems(HorizontalAlign.Start);
                    Column.width('100%');
                    Column.padding({ top: 8 });
                    Column.margin({ bottom: 8 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('描述');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    TextArea.create({ placeholder: '添加分类描述', text: this.description });
                    TextArea.height(120);
                    TextArea.onChange((value) => {
                        this.description = value;
                    });
                }, TextArea);
                Column.pop();
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
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AddCategory" });
            NavDestination.title('添加分类');
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
        return "AddCategory";
    }
}
registerNamedRoute(() => new AddCategory(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/AddCategory", pageFullPath: "entry/src/main/ets/pages/AddCategory", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("addCategory", wrapBuilder(PageBuilder));
    }
})();
