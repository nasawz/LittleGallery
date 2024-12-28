if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SettingDialog_Params {
    controller?: CustomDialogController;
    // 定义点击事件处理函数
    onPressAddChildren?: () => void;
    onPressAlbumManage?: () => void;
    onPressCategoryManage?: () => void;
}
export default class SettingDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.onPressAddChildren = () => { };
        this.onPressAlbumManage = () => { };
        this.onPressCategoryManage = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SettingDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onPressAddChildren !== undefined) {
            this.onPressAddChildren = params.onPressAddChildren;
        }
        if (params.onPressAlbumManage !== undefined) {
            this.onPressAlbumManage = params.onPressAlbumManage;
        }
        if (params.onPressCategoryManage !== undefined) {
            this.onPressCategoryManage = params.onPressCategoryManage;
        }
    }
    updateStateVars(params: SettingDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    // 定义点击事件处理函数
    private onPressAddChildren: () => void;
    private onPressAlbumManage: () => void;
    private onPressCategoryManage: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
            Column.borderRadius(10);
            Column.padding({ top: 16, bottom: 16, left: 16, right: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设置标题
            Text.create("设置");
            // 设置标题
            Text.fontSize(20);
            // 设置标题
            Text.fontWeight(600);
        }, Text);
        // 设置标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 孩子选项
            Row.create({ space: 10 });
            // 孩子选项
            Row.alignItems(VerticalAlign.Center);
            // 孩子选项
            Row.onClick(() => {
                this.onPressAddChildren();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777304, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Image.width(30);
            Image.height(30);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('孩子');
            Text.fontSize(18);
        }, Text);
        Text.pop();
        // 孩子选项
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 分类选项
            Row.create({ space: 10 });
            // 分类选项
            Row.alignItems(VerticalAlign.Center);
            // 分类选项
            Row.onClick(() => {
                this.onPressCategoryManage();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777303, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Image.width(30);
            Image.height(30);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('分类');
            Text.fontSize(18);
        }, Text);
        Text.pop();
        // 分类选项
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 画册选项
            Row.create({ space: 10 });
            // 画册选项
            Row.alignItems(VerticalAlign.Center);
            // 画册选项
            Row.onClick(() => {
                this.onPressAlbumManage();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777300, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Image.width(30);
            Image.height(30);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('画册');
            Text.fontSize(18);
        }, Text);
        Text.pop();
        // 画册选项
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 版本信息
            Row.create();
            // 版本信息
            Row.justifyContent(FlexAlign.Center);
            // 版本信息
            Row.margin({ top: 20 });
            // 版本信息
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('版本：1.0.0');
            Text.fontSize(12);
        }, Text);
        Text.pop();
        // 版本信息
        Row.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
