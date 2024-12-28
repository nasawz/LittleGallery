import { AGConnectAuthCredentialProvider } from "../../r";
import { PhoneUtil } from "../../k/l";
import { AuthBaseRequest } from "./o3";
export class ResetPhonePasswordRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.countryCode = '';
        this.phoneNumber = '';
        this.newPassword = '';
        this.verifyCode = '';
        this.URL_PATH_SURFFIX = '/reset-password';
    }
    async body() {
        return {
            'account': PhoneUtil.combinatePhone(this.countryCode, this.phoneNumber),
            'password': this.newPassword,
            'verifyCode': this.verifyCode,
            'provider': AGConnectAuthCredentialProvider.Phone_Provider
        };
    }
}
