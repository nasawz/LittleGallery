import { BaseResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/m2/q2&1.0.2";
import { TokenInfo } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/h3&1.0.2";
import { UserInfo } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/i3&1.0.2";
export class SignInResponse extends BaseResponse {
    constructor() {
        super(...arguments);
        this.accessToken = new TokenInfo();
        this.refreshToken = new TokenInfo();
        this.userInfo = new UserInfo();
        this.providers = [];
    }
    constructResponse(response) {
        let res = response;
        this.accessToken.setToken(res.accessToken?.token);
        this.accessToken.setValidPeriod(res.accessToken?.validPeriod);
        this.refreshToken.setToken(res.refreshToken?.token);
        this.refreshToken.setValidPeriod(res.refreshToken?.validPeriod);
        this.userInfo.setUid(res.userInfo?.uid);
        this.userInfo.setEmail(res.userInfo?.email);
        this.userInfo.setPhone(res.userInfo?.phone);
        this.userInfo.setProvider(res.userInfo?.provider);
        this.userInfo.setEmailVerified(res.userInfo?.emailVerified);
        this.userInfo.setPasswordSetted(res.userInfo?.passwordSetted);
        this.userInfo.setDisplayName(res.userInfo?.displayName);
        this.userInfo.setOpenId(res.userInfo?.openId);
        this.userInfo.setPhotoUrl(res.userInfo?.photoUrl);
        let providers = [];
        for (let i = 0; i < res.providers?.length; i++) {
            let map = new Map();
            this.userInfoToMap(res.providers[i], map);
            providers.push(map);
        }
        this.providers = providers;
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
    getProviders() {
        return this.providers;
    }
    userInfoToMap(userInfo, map) {
        let user = userInfo;
        if (user.uid) {
            map["uid"] = user.uid.toString();
        }
        if (user.displayName) {
            map["displayName"] = user.displayName.toString();
        }
        if (user.photoUrl) {
            map["photoUrl"] = user.photoUrl.toString();
        }
        if (user.email) {
            map["email"] = user.email.toString();
        }
        if (user.phone) {
            map["phone"] = user.phone.toString();
        }
        if (user.provider) {
            map["provider"] = user.provider.toString();
        }
        if (user.openId) {
            map["openId"] = user.openId.toString();
        }
    }
}
