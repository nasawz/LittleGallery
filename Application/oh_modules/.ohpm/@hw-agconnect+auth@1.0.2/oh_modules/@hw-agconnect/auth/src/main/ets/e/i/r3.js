import { AGConnectAuthCredentialProvider } from "../../r";
import { AuthBaseRequest } from "./o3";
export class ResetEmailPasswordRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.email = '';
        this.newPassword = '';
        this.verifyCode = '';
        this.URL_PATH_SURFFIX = '/reset-password';
    }
    async body() {
        return {
            'account': this.email,
            'password': this.newPassword,
            'verifyCode': this.verifyCode,
            'provider': AGConnectAuthCredentialProvider.Email_Provider
        };
    }
}
