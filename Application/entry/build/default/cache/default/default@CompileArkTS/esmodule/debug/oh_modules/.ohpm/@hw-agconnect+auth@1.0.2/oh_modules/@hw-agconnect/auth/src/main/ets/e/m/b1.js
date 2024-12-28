import { BaseResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/m2/q2&1.0.2";
import { TokenInfo } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/h3&1.0.2";
import { UserInfo } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/i3&1.0.2";
export class SignInAnonymousResponse extends BaseResponse {
    constructor() {
        super(...arguments);
        this.uid = '';
        this.accessToken = new TokenInfo();
        this.refreshToken = new TokenInfo();
        this.userInfo = new UserInfo();
    }
    constructResponse(response) {
        let res = response;
        this.accessToken.setToken(res.accessToken?.token);
        this.accessToken.setValidPeriod(res.accessToken?.validPeriod);
        this.refreshToken.setToken(res.refreshToken?.token);
        this.refreshToken.setValidPeriod(res.refreshToken?.validPeriod);
        this.userInfo.setUid(res.uid);
        return true;
    }
    getAccessToken() {
        return this.accessToken;
    }
    setAccessToken(accessToken) {
        this.accessToken = accessToken;
    }
    getRefreshToken() {
        return this.refreshToken;
    }
    setRefreshToken(refreshToken) {
        this.refreshToken = refreshToken;
    }
    getUserInfo() {
        return this.userInfo;
    }
}
