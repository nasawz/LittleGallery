import { PhoneUtil } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/k/l&1.0.2";
import { AuthBaseRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/o3&1.0.2";
export class UpdatePhoneRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.countryCode = '';
        this.newPhone = '';
        this.newVerifyCode = '';
        this.lang = '';
        this.URL_PATH_SURFFIX = '/user-phone-email';
    }
    async body() {
        return {
            'lang': this.lang,
            'newPhone': PhoneUtil.combinatePhone(this.countryCode, this.newPhone),
            'newVerifyCode': this.newVerifyCode
        };
    }
}
