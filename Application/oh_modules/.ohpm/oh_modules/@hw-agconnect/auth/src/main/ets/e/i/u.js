import { AuthBaseRequest } from "./o3";
export class ResetPasswordRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.account = '';
        this.newPassword = '';
        this.verifyCode = '';
        this.provider = -1;
        this.URL_PATH_SURFFIX = '/reset-password';
    }
    async body() {
        return {
            'account': this.account,
            'password': this.newPassword,
            'verifyCode': this.verifyCode,
            'provider': this.provider
        };
    }
}
