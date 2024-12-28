import { ConnectRet } from "./p2";
export class BaseResponse {
    constructor() {
        this.ret = new ConnectRet();
    }
    isSuccess() {
        return this.root?.ret != null && this.root.ret.code === 0;
    }
    getRet() {
        return this.root.ret;
    }
    setRet(value) {
        this.root.ret = value;
    }
    constructResponse(response) {
        return false;
    }
}
