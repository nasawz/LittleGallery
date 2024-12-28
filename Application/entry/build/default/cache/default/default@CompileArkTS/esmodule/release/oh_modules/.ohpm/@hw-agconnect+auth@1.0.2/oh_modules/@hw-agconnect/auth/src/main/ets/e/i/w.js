import { AuthBaseRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/o3&1.0.2";
export class SignInRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-signin';
        this.provider = -1;
        this.token = '';
        this.extraData = '';
        this.autoCreateUser = true;
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
    setAutoCreateUser(autoCreateUser) {
        this.autoCreateUser = autoCreateUser;
    }
    setProvider(provider) {
        this.provider = provider;
    }
    setToken(token) {
        this.token = token;
    }
    async body() {
        return {
            'provider': this.provider,
            'token': this.token,
            'extraData': this.extraData,
            'autoCreateUser': this.autoCreateUser ? 1 : 0,
            'useJwt': this.useJwt
        };
    }
}
