import { AuthBaseRequest } from "./o3";
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
