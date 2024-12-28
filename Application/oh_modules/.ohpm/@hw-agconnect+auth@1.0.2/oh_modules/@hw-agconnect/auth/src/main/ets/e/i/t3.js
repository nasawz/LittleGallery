import { AuthBaseRequest } from "./o3";
export class UpdateEmailRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-phone-email';
        this.newEmail = '';
        this.newVerifyCode = '';
        this.lang = '';
    }
    setNewVerifyCode(newVerifyCode) {
        this.newVerifyCode = newVerifyCode;
    }
    setNewEmail(newEmail) {
        this.newEmail = newEmail;
    }
    setLang(lang) {
        this.lang = lang;
    }
    async body() {
        return {
            'lang': this.lang,
            'newEmail': this.newEmail,
            'newVerifyCode': this.newVerifyCode
        };
    }
}
