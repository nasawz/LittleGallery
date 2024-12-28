if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import promptAction from "@ohos:promptAction";
import { MainStat } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import type { resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import { Album } from "@normalized:N&&&entry/src/main/ets/module/Album&";
import { WaterFlowDataSource } from "@normalized:N&&&entry/src/main/ets/common/WaterFlowDataSource&";
import type { Picture } from "../module/Picture";
import CoreService from "@normalized:N&&&entry/src/main/ets/services/CoreService&";
import { PictureItem } from "@normalized:N&&&entry/src/main/ets/components/PictureItem&";
import { WindowUtils } from "@normalized:N&&&entry/src/main/ets/utils/WindowUtils&";
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new AlbumDetail(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AlbumDetail.ets", line: 31, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "AlbumDetail" });
    }
}
class AlbumDetail extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.info = new Album();
        this.pictures = [];
        this.loaded = false;
        this.pageInfos = new NavPathStack();
        this.minSize = 80;
        this.maxSize = 180;
        this.fontSize = 24;
        this.colors = [0xFFC0CB, 0xDA70D6, 0x6B8E23, 0x6A5ACD, 0x00FFFF, 0x00FF7F];
        this.dataSource = new WaterFlowDataSource();
        this.itemWidthArray = [];
        this.itemHeightArray = [];
        this.currentOffset = 0;
        this.limit = 20;
        this.finalizeConstruction();
    }
    @Local
    prop: MainStat;
    @Local
    info: Album;
    @Local
    pictures: Picture[];
    @Local
    loaded: boolean;
    pageInfos: NavPathStack;
    @Local
    minSize: number;
    @Local
    maxSize: number;
    @Local
    fontSize: number;
    @Local
    colors: number[];
    dataSource: WaterFlowDataSource;
    private itemWidthArray: number[];
    private itemHeightArray: number[];
    private currentOffset: number;
    private limit: number;
    // 计算FlowItem宽/高
    getSize() {
        let ret = Math.floor(Math.random() * this.maxSize);
        return (ret > this.minSize ? ret : this.minSize);
    }
    // 设置FlowItem的宽/高数组
    setItemSizeArray() {
        for (let i = 0; i < 100; i++) {
            this.itemWidthArray.push(this.getSize());
            this.itemHeightArray.push(this.getSize());
        }
    }
    itemFoot(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`Footer`);
            Text.fontSize(10);
            Text.backgroundColor(Color.Red);
            Text.width(50);
            Text.height(50);
            Text.align(Alignment.Center);
            Text.margin({ top: 2 });
        }, Text);
        Text.pop();
        Column.pop();
    }
    // 页面即将出现时调用
    aboutToAppear() {
        this.setItemSizeArray();
        setTimeout(async () => {
            this.info = this.pageInfos.getParamByName('albumDetail')[0] as Album;
            await this.loadPictures();
        }, 100);
    }
    // 异步加载图片
    async loadPictures() {
        console.log('littleGallery', 'loadPictures', JSON.stringify(this.info));
        try {
            console.log('littleGallery', 'loadPictures', this.info.id, this.limit, this.currentOffset);
            const coreService = CoreService.getService();
            const pictures = await coreService.getPictures(this.info.id, this.limit, this.currentOffset);
            this.pictures = pictures;
            this.loaded = true;
            console.log('littleGallery', 'loadPictures pictures', JSON.stringify(pictures));
            if (this.currentOffset === 0) {
                this.dataSource.setData(pictures); // 首次加载使用 setData
            }
            else {
                this.dataSource.appendData(pictures); // 加载更多时使用 appendData
            }
            this.currentOffset += this.limit;
        }
        catch (error) {
            console.log('littleGallery', 'loadPictures error', JSON.stringify(error));
        }
    }
    // 跳转到添加图片页面
    goAddPicture() {
        this.pageInfos.pushPathByName('addPicture', { "action": "add", "album": this.info }, (popInfo: PopInfo) => {
            if ((popInfo.result as resultClass).count == 1) {
                this.currentOffset = 0;
                this.loadPictures();
            }
        });
    }
    // 删除图片处理
    async deleteHandle(id: string, index: number) {
        let succ = await CoreService.getService().deletePicture(id);
        if (succ) {
            promptAction.showToast({
                message: '删除成功 ' + id,
                duration: 2000
            });
            this.currentOffset = 0;
            this.loadPictures();
        }
        else {
            promptAction.showToast({
                message: '删除失败',
                duration: 2000
            });
        }
    }
    // 跳转到图片详情页面
    goPictureDetail(url: string) {
        this.pageInfos.pushPathByName('pictureDetail', url, (popInfo: PopInfo) => {
        });
    }
    addPictureButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('添加孩子的作品', { buttonStyle: ButtonStyleMode.NORMAL, role: ButtonRole.NORMAL });
            Button.fontColor({ "id": 125830983, "type": 10001, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Button.onClick(() => {
                this.goAddPicture();
            });
        }, Button);
        Button.pop();
    }
    // 构建页面
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.pictures.length > 0 && this.loaded) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Stack.create({ alignContent: Alignment.BottomEnd });
                                Stack.width('100%');
                                Stack.height('100%');
                            }, Stack);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                WaterFlow.create();
                                WaterFlow.columnsTemplate("1fr 1fr");
                                WaterFlow.columnsGap(10);
                                WaterFlow.rowsGap(5);
                                WaterFlow.width('100%');
                                WaterFlow.height('100%');
                                WaterFlow.padding({ left: 8, right: 8 });
                                WaterFlow.edgeEffect(EdgeEffect.Spring);
                                WaterFlow.onReachStart(() => {
                                });
                                WaterFlow.onReachEnd(() => {
                                });
                                WaterFlow.onScrollFrameBegin((offset: number, state: ScrollState) => {
                                    console.info('waterFlow scrollFrameBegin offset: ' + offset + ' state: ' + state.toString());
                                    return { offsetRemain: offset };
                                });
                            }, WaterFlow);
                            {
                                const __lazyForEachItemGenFunction = (_item, index) => {
                                    const item = _item;
                                    {
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            if (isInitialRender) {
                                                let componentCall = new PictureItem(this, { picture: item, maxWidth: (px2vp(WindowUtils.windowWidth_px) - 5 - 16) / 2, onDelete: () => {
                                                        this.deleteHandle(item.id, index);
                                                    }, onGoDetail: (url: string) => {
                                                        this.goPictureDetail(url);
                                                    } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AlbumDetail.ets", line: 160, col: 15 });
                                                ViewV2.create(componentCall);
                                                let paramsLambda = () => {
                                                    return {
                                                        picture: item,
                                                        maxWidth: (px2vp(WindowUtils.windowWidth_px) - 5 - 16) / 2,
                                                        onDelete: () => {
                                                            this.deleteHandle(item.id, index);
                                                        },
                                                        onGoDetail: (url: string) => {
                                                            this.goPictureDetail(url);
                                                        }
                                                    };
                                                };
                                                componentCall.paramsGenerator_ = paramsLambda;
                                            }
                                            else {
                                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                                    picture: item, maxWidth: (px2vp(WindowUtils.windowWidth_px) - 5 - 16) / 2, onDelete: () => {
                                                        this.deleteHandle(item.id, index);
                                                    }, onGoDetail: (url: string) => {
                                                        this.goPictureDetail(url);
                                                    }
                                                });
                                            }
                                        }, { name: "PictureItem" });
                                    }
                                };
                                const __lazyForEachItemIdFunc = (item: Picture) => item.id;
                                LazyForEach.create("1", this, this.dataSource, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
                                LazyForEach.pop();
                            }
                            WaterFlow.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.margin({ bottom: 20, right: 20 });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
                                Button.width(55);
                                Button.height(55);
                                Button.backgroundColor(0x317aff);
                                Button.onClick(() => {
                                    this.goAddPicture();
                                });
                            }, Button);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777325, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                Image.fillColor(Color.White);
                                Image.width(24);
                                Image.height(24);
                            }, Image);
                            Button.pop();
                            Row.pop();
                            Stack.pop();
                        });
                    }
                    else if (this.pictures.length == 0 && this.loaded) {
                        this.ifElseBranchUpdateFunction(1, () => {
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
                                Image.create({ "id": 16777323, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
                                Image.width(160);
                                Image.height(160);
                                Image.opacity(0.6);
                            }, Image);
                            this.addPictureButton.bind(this)();
                            Column.pop();
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(2, () => {
                        });
                    }
                }, If);
                If.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/AlbumDetail" });
            NavDestination.title(this.info?.name);
            NavDestination.onBackPressed(() => {
                const popDestinationInfo = this.pageInfos.pop();
                console.log('pop' + '返回值' + JSON.stringify(popDestinationInfo));
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
        return "AlbumDetail";
    }
}
registerNamedRoute(() => new AlbumDetail(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/AlbumDetail", pageFullPath: "entry/src/main/ets/pages/AlbumDetail", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("albumDetail", wrapBuilder(PageBuilder));
    }
})();
