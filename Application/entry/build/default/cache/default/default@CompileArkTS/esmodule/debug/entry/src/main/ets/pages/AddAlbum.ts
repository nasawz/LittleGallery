if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import cloudDatabase from "@hms:core.deviceCloudGateway.cloudDatabase";
import util from "@ohos:util";
import { Album } from "@normalized:N&&&entry/src/main/ets/module/Album&";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import { AppConfig } from "@normalized:N&&&entry/src/main/ets/utils/AppConfig&";
// 定义选择选项的接口
interface SelectOption {
    value: string;
}
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new AddAlbum(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AddAlbum.ets", line: 31, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "AddAlbum" });
    }
}
class AddAlbum extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.description = '';
        this.name = '';
        this.childId = '';
        this.childName = '请选择';
        this.childIndex = 0;
        this.categoryId = '';
        this.categoryName = '请选择';
        this.categoryIndex = 0;
        this.albumId = '';
        this.createTime = new Date();
        this.pageInfos = new NavPathStack();
        this.agcDataBase = undefined;
        this.finalizeConstruction();
    }
    // 本地状态变量
    @Local
    prop: MainStat;
    @Local
    description: string;
    @Local
    name: string;
    @Local
    childId: string;
    @Local
    childName: string;
    @Local
    childIndex: number;
    @Local
    categoryId: string;
    @Local
    categoryName: string;
    @Local
    categoryIndex: number;
    albumId: string;
    createTime: Date;
    pageInfos: NavPathStack;
    agcDataBase: cloudDatabase.DatabaseZone | undefined;
    aboutToAppear() {
        // 初始化数据库连接
        this.agcDataBase = cloudDatabase.zone(AppConfig.dbZone);
        setTimeout(async () => {
            // 获取页面参数
            let params: any = this.pageInfos.getParamByName('addAlbum')[0] as any;
            console.log('littleGallery', 'addAlbum', JSON.stringify(params));
            if (params["categoryId"] != null && params['id'] == null) {
                // 设置分类信息
                this.categoryId = params['categoryId'];
                this.categoryIndex = this.prop.categories.findIndex(category => category.id == this.categoryId) + 1;
                if (this.categoryIndex == 0) {
                    this.categoryName = '请选择';
                }
                else {
                    this.categoryName = this.prop.categories[this.categoryIndex - 1].name;
                }
            }
            else {
                // 设置相册信息
                let album = this.pageInfos.getParamByName('addAlbum')[0] as Album;
                this.name = album.name;
                this.description = album.description;
                this.categoryId = album.categoryId;
                this.categoryIndex = this.prop.categories.findIndex(category => category.id == this.categoryId) + 1;
                if (this.categoryIndex == 0) {
                    this.categoryName = '请选择';
                }
                else {
                    this.categoryName = this.prop.categories[this.categoryIndex - 1].name;
                }
                console.log('littleGallery', 'child', JSON.stringify(this.prop.child));
                this.childIndex = this.prop.child.findIndex(child => child.id == album.childId) + 1;
                console.log('littleGallery', 'childIndex', this.childIndex);
                this.childId = album.childId;
                if (this.childIndex == 0) {
                    this.childName = '请选择';
                }
                else {
                    this.childName = this.prop.child[this.childIndex - 1].name;
                }
                this.albumId = album.id;
                this.createTime = album.createTime;
            }
        }, 100);
    }
    async onSave() {
        // 验证输入
        if (this.name.length == 0) {
            promptAction.showToast({
                message: '请输入画册名称',
                duration: 2000
            });
            return;
        }
        if (this.childId == '') {
            promptAction.showToast({
                message: '请选择孩子',
                duration: 2000
            });
            return;
        }
        if (this.categoryId == '') {
            promptAction.showToast({
                message: '请选择分类',
                duration: 2000
            });
            return;
        }
        try {
            // 创建并保存相册
            const album = new Album();
            album.id = this.albumId == '' ? util.generateRandomUUID(true) : this.albumId;
            album.userId = this.prop.userId;
            album.name = this.name;
            album.description = this.description;
            album.childId = this.childId;
            album.categoryId = this.categoryId;
            album.createTime = this.createTime;
            await this.agcDataBase?.upsert(album);
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
                    // 画册名称输入
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
                    Text.create('画册名称');
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
                // 画册名称输入
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 描述输入
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
                    TextArea.create({ placeholder: '添加画册描述', text: this.description });
                    TextArea.height(120);
                    TextArea.onChange((value: string) => {
                        this.description = value;
                    });
                }, TextArea);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                }, Divider);
                // 描述输入
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 孩子选择
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
                    Text.create('孩子');
                    Text.width('20%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create([{ value: '请选择' } as SelectOption, ...this.prop.child.map(child => ({ value: child.name } as SelectOption))]);
                    Select.selected(this.childIndex);
                    Select.enabled(this.albumId == '');
                    Select.value(this.childName);
                    Select.onSelect((index: number, text?: string | undefined) => {
                        if (index == 0) {
                            this.childId = '';
                            this.childName = '请选择';
                        }
                        else {
                            let child = this.prop.child[index - 1];
                            this.childId = child.id;
                            this.childName = child.name;
                        }
                    });
                }, Select);
                Select.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                }, Divider);
                // 孩子选择
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 分类选择
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
                    Text.create('分类');
                    Text.width('20%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Select.create([{ value: '请选择' } as SelectOption, ...this.prop.categories.map(category => ({ value: category.name } as SelectOption))]);
                    Select.selected(this.categoryIndex);
                    Select.enabled(this.albumId == '');
                    Select.value(this.categoryName);
                    Select.onSelect((index: number, text?: string | undefined) => {
                        if (index == 0) {
                            this.categoryId = '';
                            this.categoryName = '请选择';
                        }
                        else {
                            let category = this.prop.categories[index - 1];
                            this.categoryId = category.id;
                            this.categoryName = category.name;
                        }
                    });
                }, Select);
                Select.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                }, Divider);
                // 分类选择
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 保存按钮
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
                // 保存按钮
                Column.pop();
                Column.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AddAlbum" });
            NavDestination.title('添加画册');
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
        return "AddAlbum";
    }
}
registerNamedRoute(() => new AddAlbum(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/AddAlbum", pageFullPath: "entry/src/main/ets/pages/AddAlbum", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("addAlbum", wrapBuilder(PageBuilder));
    }
})();
