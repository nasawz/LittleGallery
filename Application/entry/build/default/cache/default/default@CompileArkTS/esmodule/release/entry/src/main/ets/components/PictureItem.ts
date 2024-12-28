if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { Picture } from "../module/Picture";
import type { BusinessError } from "@ohos:base";
import cloudStorage from "@hms:core.deviceCloudGateway.cloudStorage";
import { ImageDetail, MainStat } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
const bucket: cloudStorage.StorageBucket = cloudStorage.bucket();
export class PictureItem extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.initParam("picture", (params && "picture" in params) ? params.picture : undefined);
        this.initParam("maxWidth", (params && "maxWidth" in params) ? params.maxWidth : undefined);
        this.initParam("onDelete", (params && "onDelete" in params) ? params.onDelete : undefined);
        this.initParam("onGoDetail", (params && "onGoDetail" in params) ? params.onGoDetail : undefined);
        this.url = '';
        this.xHeight = 0;
        this.loaded = false;
        this.finalizeConstruction();
    }
    @Local
    prop: MainStat;
    @Param
    readonly picture: Picture;
    @Param
    readonly maxWidth: number;
    @Param
    readonly onDelete: Function;
    @Param
    readonly onGoDetail: Function;
    @Local
    url: string;
    @Local
    xHeight: number;
    @Local
    loaded: boolean;
    // 组件即将出现时调用
    aboutToAppear(): void {
        console.log('littleGallery', 'PictureItem aboutToAppear', JSON.stringify(this.picture));
        // 默认 3:4 比例
        this.xHeight = this.maxWidth * 4 / 3;
        // 检查图像详情是否已存储
        const existingDetail = this.prop.imageDetails.find(detail => detail.key === this.picture.imageUrl);
        if (existingDetail) {
            this.url = existingDetail.url;
            this.xHeight = existingDetail.height;
        }
        else {
            this.getDownloadUrl(this.picture.imageUrl);
        }
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
    // 计算图像高度
    private calcHeight(picWidth: number, picHeight: number) {
        this.xHeight = picHeight * this.maxWidth / picWidth;
        this.prop.imageDetails.push(new ImageDetail(this.picture.imageUrl, this.xHeight, this.url));
    }
    // 删除菜单构建器
    DeleteMenuBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Menu.create();
        }, Menu);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            MenuItem.create({ startIcon: { "id": 16777327, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" }, content: "删除" });
            MenuItem.onClick(() => {
                this.onDelete();
            });
            MenuItem.foregroundColor(Color.Red);
        }, MenuItem);
        MenuItem.pop();
        Menu.pop();
    }
    // 构建组件
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            FlowItem.create();
            FlowItem.width(this.maxWidth);
            FlowItem.height(this.xHeight);
            FlowItem.padding({ left: 6, right: 6, top: 6, bottom: 6 });
            FlowItem.onClick(() => {
                this.onGoDetail(this.url);
            });
        }, FlowItem);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.url != '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.padding({ left: 4, right: 4, top: 4, bottom: 4 });
                        Column.backgroundColor(Color.White);
                        Column.shadow({
                            radius: 10,
                            color: '#EAEAEA',
                            offsetX: vp2px(0),
                            offsetY: vp2px(0)
                        });
                        Column.bindContextMenu({ builder: this.DeleteMenuBuilder.bind(this) }, ResponseType.LongPress);
                        Column.onDragStart(() => {
                            ContextMenu.close();
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.url);
                        Image.draggable(false);
                        Image.objectFit(ImageFit.Fill);
                        Image.width('100%');
                        Image.layoutWeight(1);
                        Image.onComplete((e) => {
                            let picWidth = e?.width;
                            let picHeight = e?.height;
                            if (picWidth && picWidth > 0 && picHeight && picHeight > 0) {
                                this.calcHeight(picWidth, picHeight);
                                this.loaded = true;
                            }
                        });
                    }, Image);
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.loaded == false) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    LoadingProgress.create();
                                    LoadingProgress.layoutWeight(1);
                                    LoadingProgress.width(30);
                                    LoadingProgress.height(30);
                                }, LoadingProgress);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        Column.pop();
        FlowItem.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("picture" in params) {
            this.updateParam("picture", params.picture);
        }
        if ("maxWidth" in params) {
            this.updateParam("maxWidth", params.maxWidth);
        }
        if ("onDelete" in params) {
            this.updateParam("onDelete", params.onDelete);
        }
        if ("onGoDetail" in params) {
            this.updateParam("onGoDetail", params.onGoDetail);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
