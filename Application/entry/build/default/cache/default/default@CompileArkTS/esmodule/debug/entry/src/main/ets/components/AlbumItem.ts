if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { Album } from "../module/Album";
import cloudStorage from "@hms:core.deviceCloudGateway.cloudStorage";
import type { BusinessError } from "@ohos:base";
import { MainStat } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
const bucket: cloudStorage.StorageBucket = cloudStorage.bucket();
export class AlbumItem extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.initParam("item", (params && "item" in params) ? params.item : undefined);
        this.initParam("onGoDetail", (params && "onGoDetail" in params) ? params.onGoDetail : undefined);
        this.initParam("maxWidth", (params && "maxWidth" in params) ? params.maxWidth : undefined);
        this.url = '';
        this.childName = '';
        this.ratio = 3 / 4;
        this.finalizeConstruction();
    }
    @Local
    prop: MainStat;
    @Param
    readonly item: Album;
    @Param
    readonly onGoDetail: Function;
    @Param
    readonly maxWidth: number;
    @Local
    url: string;
    @Local
    childName: string;
    // 比例
    ratio: number;
    // 组件即将出现时调用
    aboutToAppear(): void {
        if (this.item.coverImage) {
            this.getDownloadUrl(this.item.coverImage);
        }
        this.prop.child.forEach(child => {
            if (child.id == this.item.childId) {
                this.childName = child.name;
            }
        });
    }
    // 获取下载URL
    private getDownloadUrl(path: string) {
        console.log('littleGallery', 'PictureItem getDownloadUrl', path);
        bucket.getDownloadURL(path).then(async (downloadURL: string) => {
            console.log('littleGallery', 'PictureItem getDownloadUrl', downloadURL);
            this.url = downloadURL;
        }).catch((err: BusinessError) => {
            // 错误处理
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.onClick(() => {
                this.onGoDetail(this.item);
            });
            Stack.alignContent(Alignment.TopStart);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(this.maxWidth);
            Column.height(this.maxWidth * this.ratio);
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.End);
            Column.backgroundColor(Color.White);
            Column.shadow({
                radius: 10,
                color: '#50000000',
                offsetX: vp2px(0),
                offsetY: vp2px(0)
            });
        }, Column);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.url != '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(this.maxWidth);
                        Row.height(this.maxWidth * this.ratio);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.url);
                        Image.objectFit(ImageFit.Cover);
                        Image.width(this.maxWidth);
                        Image.height(this.maxWidth * this.ratio);
                    }, Image);
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.linearGradient({
                angle: 90,
                colors: [[0x94B4ED, 0.0], ['#A1C2FF', 0.05], ['#95A1C2FF', 0.5], ['#90A1C2FF', 1.0]]
            });
            Row.width(this.maxWidth);
            Row.height(this.maxWidth * this.ratio);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.alignItems(VerticalAlign.Top);
            Row.justifyContent(FlexAlign.Center);
            Row.padding({ left: 8, right: 8, top: 8, bottom: 8 });
            Row.linearGradient({
                angle: 90,
                colors: [[0xEEEEEE, 0.0], [0xffffff, 0.1], [0xffffff, 1.0]]
            });
            Row.margin({ top: 10 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.item.description != '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(10);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.item.description);
                        Text.fontSize(10);
                        Text.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(20);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.name);
        }, Text);
        Text.pop();
        Row.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.childName != '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.alignItems(VerticalAlign.Bottom);
                        Row.justifyContent(FlexAlign.End);
                        Row.width(this.maxWidth);
                        Row.height(this.maxWidth * this.ratio);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.height(20);
                        Row.padding({ top: 4, bottom: 4, left: 6, right: 8 });
                        Row.backgroundColor(Color.White);
                        Row.margin({ bottom: 8, right: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.childName);
                        Text.fontSize(12);
                    }, Text);
                    Text.pop();
                    Row.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("item" in params) {
            this.updateParam("item", params.item);
        }
        if ("onGoDetail" in params) {
            this.updateParam("onGoDetail", params.onGoDetail);
        }
        if ("maxWidth" in params) {
            this.updateParam("maxWidth", params.maxWidth);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
