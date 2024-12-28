import { BaseResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/m2/q2&1.0.2";
import { UserInfo } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/i3&1.0.2";
export class UserLinkResponse extends BaseResponse {
    constructor() {
        super();
        this.providerUserInfo = undefined;
    }
    getProviderUserInfo() {
        return this.providerUserInfo;
    }
    setProviderUserInfo(providerUserInfo) {
        this.providerUserInfo = providerUserInfo;
    }
    constructResponse(response) {
        let res = response;
        let userInfo = new UserInfo();
        if (res.providerUserInfo) {
            userInfo.setUid(res.providerUserInfo.uid);
            userInfo.setDisplayName(res.providerUserInfo.displayName);
            userInfo.setPhotoUrl(res.providerUserInfo.photoUrl);
            userInfo.setPhone(res.providerUserInfo.phone);
            userInfo.setEmail(res.providerUserInfo.email);
            userInfo.setProvider(res.providerUserInfo.provider);
            userInfo.setOpenId(res.providerUserInfo.openId);
            userInfo.setEmailVerified(res.providerUserInfo.emailVerified);
            userInfo.setPasswordSetted(res.providerUserInfo.passwordSetted);
            this.setProviderUserInfo(userInfo);
        }
        return true;
    }
}
