import { AuthBaseRequest } from "./o3";
export class VerifyCodeRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/verify-code';
        this.phone = '';
        this.email = '';
        this.action = -1;
        this.lang = '';
        this.sendInterval = -1;
    }
    async body() {
        return {
            'phone': this.phone,
            'email': this.email,
            'lang': this.lang,
            'action': this.action,
            'sendInterval': this.sendInterval
        };
    }
    setPhone(phone) {
        this.phone = phone;
    }
    setEmail(email) {
        this.email = email;
    }
    setAction(action) {
        this.action = action;
    }
    setLang(lang) {
        this.lang = lang;
    }
    setSendInterval(sendInterval) {
        this.sendInterval = sendInterval;
    }
}
