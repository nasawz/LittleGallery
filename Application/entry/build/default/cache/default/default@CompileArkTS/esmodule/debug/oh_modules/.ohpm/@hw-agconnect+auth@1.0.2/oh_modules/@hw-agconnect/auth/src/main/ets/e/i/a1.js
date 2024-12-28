import { AuthBaseRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/o3&1.0.2";
import { AGConnectAuthCredentialProvider } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/r&1.0.2";
import AAID from "@hms:core.AAID";
export class SignInAnonymousRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-signin-anonymous';
        this.provider = AGConnectAuthCredentialProvider.Anonymous;
        this.extraData = '';
        this.useJwt = 1;
    }
    setUseJwt(useJwt) {
        this.useJwt = useJwt;
    }
    getExtraData() {
        return this.extraData;
    }
    setExtraData(extraData) {
        this.extraData = extraData;
    }
    setProvider(provider) {
        this.provider = provider;
    }
    async body() {
        return {
            'provider': this.provider,
            'token': await AAID.getAAID(),
            'extraData': this.extraData,
            'useJwt': this.useJwt
        };
    }
}
