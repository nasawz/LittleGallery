import { BaseResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/m2/q2&1.0.2";
export class VerifyCodeResponse extends BaseResponse {
    constructor() {
        super(...arguments);
        this.shortestInterval = '';
        this.validityPeriod = '';
    }
    constructResponse(response) {
        let res = response;
        this.shortestInterval = res.shortestInterval;
        this.validityPeriod = res.validityPeriod;
        return true;
    }
}
