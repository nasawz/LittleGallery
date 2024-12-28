import { AuthImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/a&1.0.2";
import { AGConnectAuthCredentialProvider } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/r&1.0.2";
import { Logger } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/f1/g1&1.0.2";
import { OAuth2Credential } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/x/j3&1.0.2";
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
