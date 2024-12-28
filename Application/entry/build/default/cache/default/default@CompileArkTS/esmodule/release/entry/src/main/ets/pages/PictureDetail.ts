if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import { MainStat, resultClass } from "@normalized:N&&&entry/src/main/ets/common/MainStat&";
import { PhotoView } from "@normalized:N&&&@ohos/photoview/index&2.1.0";
export function PageBuilder(name: string, param: Object, parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PictureDetail(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PictureDetail.ets", line: 25, col: 3 });
                ViewV2.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "PictureDetail" });
    }
}
class PictureDetail extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.prop = AppStorageV2.connect(MainStat, () => new MainStat())!;
        this.data = new PhotoView.Model();
        this.pageInfos = new NavPathStack();
        this.finalizeConstruction();
    }
    @Local
    prop: MainStat;
    @Local
    data: PhotoView.Model;
    pageInfos: NavPathStack;
    aboutToAppear() {
        setTimeout(async () => {
            let url = this.pageInfos.getParamByName('pictureDetail')[0] as string;
            console.log('littleGallery', 'PictureDetail', url);
            this.data
                .setImageURI(url)
                .setScale(1, true)
                .setImageFit(ImageFit.Contain)
                .setZoomable(true);
        }, 100);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new PhotoView(this, { model: this.data }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/PictureDetail.ets", line: 50, col: 7 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    model: this.data
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                model: this.data
                            });
                        }
                    }, { name: "PhotoView" });
                }
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/PictureDetail" });
            NavDestination.title('');
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
        return "PictureDetail";
    }
}
registerNamedRoute(() => new PictureDetail(undefined, {}), "", { bundleName: "com.atomicservice.5765880207856138875", moduleName: "entry", pagePath: "pages/PictureDetail", pageFullPath: "entry/src/main/ets/pages/PictureDetail", integratedHsp: "false", moduleType: "followWithHap" });
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("pictureDetail", wrapBuilder(PageBuilder));
    }
})();
