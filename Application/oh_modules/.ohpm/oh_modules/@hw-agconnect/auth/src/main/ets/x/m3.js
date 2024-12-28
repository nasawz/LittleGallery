import { AccountCredential } from "./l3";
import { AGConnectAuthCredentialProvider } from "../r";
import { Logger } from "../e1/f1/g1";
export class EmailAuthCredential extends AccountCredential {
    constructor(v3) {
        super();
        this.TAG = 'EmailAuthCredential';
        this.email = v3.email;
        this.password = v3.password;
        this.verifyCode = v3.verifyCode;
    }
    getProvider() {
        return AGConnectAuthCredentialProvider.Email_Provider;
    }
    prepareUserAuthRequest(request) {
        Logger.info(this.TAG, 'prepareUserAuthRequest');
        request.setProvider(AGConnectAuthCredentialProvider.Email_Provider);
        request.setToken(this.email);
        request.setExtraData(this.generateExtraData());
    }
    prepareUserReauthRequest(request) {
        request.setProvider(AGConnectAuthCredentialProvider.Email_Provider);
        request.setToken(this.email);
        request.setExtraData(this.generateExtraData());
    }
    prepareUserLinkRequest(request) {
        request.setProvider(AGConnectAuthCredentialProvider.Email_Provider);
        request.setToken(this.email);
        request.setExtraData(this.generateExtraData());
    }
    generateExtraData() {
        return JSON.stringify({
            password: this.password,
            verifyCode: this.verifyCode
        });
    }
}
