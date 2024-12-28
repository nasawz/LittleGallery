import { AuthBaseRequest } from "./o3";
export class RefreshTokenRequest extends AuthBaseRequest {
    constructor(refreshToken) {
        super();
        this.useJwt = 1;
        this.URL_PATH_SURFFIX = '/user-auth/refresh-token';
        this.refreshToken = refreshToken;
    }
    async body() {
        return {
            'refreshToken': this.refreshToken,
            'useJwt': this.useJwt
        };
    }
}
