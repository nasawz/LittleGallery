import { PhoneUtil } from "../../k/l";
import { AuthBaseRequest } from "./o3";
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
