import { BaseResponse } from "../../e1/p1/m2/q2";
import { TokenInfo } from "../../o/h3";
export class RefreshTokenResponse extends BaseResponse {
    constructor() {
        super(...arguments);
        this.accessToken = new TokenInfo();
        this.productId = '';
        this.uid = '';
    }
    constructResponse(response) {
        let res = response;
        this.accessToken.setToken(res.accessToken.token);
        this.accessToken.setValidPeriod(res.accessToken.validPeriod);
        this.productId = res.productId;
        this.uid = res.uid;
        return true;
    }
}
