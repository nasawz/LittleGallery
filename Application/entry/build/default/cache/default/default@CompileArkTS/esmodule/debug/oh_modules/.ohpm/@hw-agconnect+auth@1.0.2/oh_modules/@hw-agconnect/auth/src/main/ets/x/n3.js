import { PhoneUtil } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/k/l&1.0.2";
import { AccountCredential } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/x/l3&1.0.2";
import { AGConnectAuthCredentialProvider } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/r&1.0.2";
import { Logger } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/f1/g1&1.0.2";
export class PhoneAuthCredential extends AccountCredential {
    constructor(c4) {
        super();
        this.TAG = 'PhoneAuthCredential';
        this.countryCode = c4.countryCode;
        this.phoneNumber = c4.phoneNumber;
        this.password = c4.password;
        this.verifyCode = c4.verifyCode;
    }
    getProvider() {
        return AGConnectAuthCredentialProvider.Phone_Provider;
    }
    prepareUserAuthRequest(request) {
        Logger.info(this.TAG, 'prepareUserAuthRequest');
        request.setProvider(AGConnectAuthCredentialProvider.Phone_Provider);
        request.setToken(PhoneUtil.combinatePhone(this.countryCode, this.phoneNumber));
        request.setExtraData(this.generateExtraData());
    }
    prepareUserReauthRequest(request) {
        request.setProvider(AGConnectAuthCredentialProvider.Phone_Provider);
        request.setToken(PhoneUtil.combinatePhone(this.countryCode, this.phoneNumber));
        request.setExtraData(this.generateExtraData());
    }
    prepareUserLinkRequest(request) {
        request.setProvider(AGConnectAuthCredentialProvider.Phone_Provider);
        request.setToken(PhoneUtil.combinatePhone(this.countryCode, this.phoneNumber));
        request.setExtraData(this.generateExtraData());
    }
    generateExtraData() {
        return JSON.stringify({
            password: this.password,
            verifyCode: this.verifyCode
        });
    }
}
