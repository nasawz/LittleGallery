import { AuthBaseRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/o3&1.0.2";
export class UserLinkRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-link';
        this.provider = -1;
        this.token = '';
        this.extraData = '';
        this.useJwt = 1;
    }
    setUseJwt(useJwt) {
        this.useJwt = useJwt;
    }
    setProvider(provider) {
        this.provider = provider;
    }
    setToken(token) {
        this.token = token;
    }
    getExtraData() {
        return this.extraData;
    }
    setExtraData(extraData) {
        this.extraData = extraData;
    }
    async body() {
        return {
            'provider': this.provider,
            'token': this.token,
            'extraData': this.extraData,
            'useJwt': this.useJwt
        };
    }
}
