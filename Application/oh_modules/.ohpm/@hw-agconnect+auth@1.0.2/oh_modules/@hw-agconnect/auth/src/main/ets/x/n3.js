import { PhoneUtil } from "../k/l";
import { AccountCredential } from "./l3";
import { AGConnectAuthCredentialProvider } from "../r";
import { Logger } from "../e1/f1/g1";
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
