import { AuthBaseRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/o3&1.0.2";
export class UpdatePasswordRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-password';
        this.verifyCode = '';
        this.newPassword = '';
        this.provider = 0;
    }
    getProvider() {
        return this.provider;
    }
    setProvider(provider) {
        this.provider = provider;
    }
    setNewPassword(newPassword) {
        this.newPassword = newPassword;
    }
    setNewverifyCode(verifyCode) {
        this.verifyCode = verifyCode;
    }
    async body() {
        return {
            'provider': this.provider,
            'verifyCode': this.verifyCode,
            'newPassword': this.newPassword
        };
    }
}
