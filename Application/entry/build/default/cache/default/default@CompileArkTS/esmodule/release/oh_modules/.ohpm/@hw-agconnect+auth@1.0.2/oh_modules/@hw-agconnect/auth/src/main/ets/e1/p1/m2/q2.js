import { ConnectRet } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/m2/p2&1.0.2";
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
