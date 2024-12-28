import { AuthBaseRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/o3&1.0.2";
export class SignOutRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.bodyAccessToken = '';
        this.refreshToken = '';
        this.URL_PATH_SURFFIX = '/user-signout';
    }
    async body() {
        return {
            'refreshToken': this.refreshToken,
            'accessToken': this.bodyAccessToken
        };
    }
}
