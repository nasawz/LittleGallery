if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FrameCard_Params {
    TITLE?: string;
    ACTION_TYPE?: string;
    ABILITY_NAME?: string;
    MESSAGE?: string;
    FULL_WIDTH_PERCENT?: string;
    FULL_HEIGHT_PERCENT?: string;
}
class FrameCard extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.TITLE = 'Hello World';
        this.ACTION_TYPE = 'router';
        this.ABILITY_NAME = 'EntryAbility';
        this.MESSAGE = 'add detail';
        this.FULL_WIDTH_PERCENT = '100%';
        this.FULL_HEIGHT_PERCENT = '100%';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FrameCard_Params) {
        if (params.TITLE !== undefined) {
            this.TITLE = params.TITLE;
        }
        if (params.ACTION_TYPE !== undefined) {
            this.ACTION_TYPE = params.ACTION_TYPE;
        }
        if (params.ABILITY_NAME !== undefined) {
            this.ABILITY_NAME = params.ABILITY_NAME;
        }
        if (params.MESSAGE !== undefined) {
            this.MESSAGE = params.MESSAGE;
        }
        if (params.FULL_WIDTH_PERCENT !== undefined) {
            this.FULL_WIDTH_PERCENT = params.FULL_WIDTH_PERCENT;
        }
        if (params.FULL_HEIGHT_PERCENT !== undefined) {
            this.FULL_HEIGHT_PERCENT = params.FULL_HEIGHT_PERCENT;
        }
    }
    updateStateVars(params: FrameCard_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /*
     * The title.
     */
    readonly TITLE: string;
    /*
     * The action type.
     */
    readonly ACTION_TYPE: string;
    /*
     * The ability name.
     */
    readonly ABILITY_NAME: string;
    /*
     * The message.
     */
    readonly MESSAGE: string;
    /*
     * The width percentage setting.
     */
    readonly FULL_WIDTH_PERCENT: string;
    /*
     * The height percentage setting.
     */
    readonly FULL_HEIGHT_PERCENT: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width(this.FULL_WIDTH_PERCENT);
            Stack.height(this.FULL_HEIGHT_PERCENT);
            Stack.onClick(() => {
                postCardAction(this, {
                    action: this.ACTION_TYPE,
                    abilityName: this.ABILITY_NAME,
                    params: {
                        message: this.MESSAGE
                    }
                });
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777320, "type": 20000, params: [], "bundleName": "com.atomicservice.5765880207856138875", "moduleName": "entry" });
            Image.width(this.FULL_WIDTH_PERCENT);
            Image.height(this.FULL_HEIGHT_PERCENT);
        }, Image);
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "FrameCard";
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadEtsCard(new FrameCard(undefined, {}), "com.atomicservice.5765880207856138875/entry/ets/frame/pages/FrameCard");
ViewStackProcessor.StopGetAccessRecording();
