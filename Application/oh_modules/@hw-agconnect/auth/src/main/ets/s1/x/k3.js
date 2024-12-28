import { AuthImpl } from "../../a";
import { AGConnectAuthCredentialProvider } from "../../r";
import { Logger } from "../../e1/f1/g1";
import { OAuth2Credential } from "../../x/j3";
export class HwIdAuthCredential extends OAuth2Credential {
    constructor(authCode) {
        super();
        this.TAG = 'EmailAuthCredential';
        this.authCode = authCode;
    }
    getProvider() {
        return AGConnectAuthCredentialProvider.HMS_Provider;
    }
    prepareUserAuthRequest(request) {
        Logger.info(this.TAG, 'prepareUserAuthRequest');
        request.setProvider(AGConnectAuthCredentialProvider.HMS_Provider);
        request.setToken('hwid');
        request.setExtraData(this.generateExtraData());
    }
    prepareUserLinkRequest(request) {
        request.setProvider(AGConnectAuthCredentialProvider.HMS_Provider);
        request.setToken('hwid');
        request.setExtraData(this.generateExtraData());
    }
    generateExtraData() {
        return JSON.stringify({
            authCode: this.authCode,
            appId: AuthImpl.getInstance().getAppId()
        });
    }
}
