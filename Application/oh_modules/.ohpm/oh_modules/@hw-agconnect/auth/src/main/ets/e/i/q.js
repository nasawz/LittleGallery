import { AuthBaseRequest } from "./o3";
import AAID from '@hms.core.AAID';
export class RegisterUserRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.email = '';
        this.phone = '';
        this.password = '';
        this.verifyCode = '';
        this.provider = -1;
        this.URL_PATH_SURFFIX = '/user-register';
        this.useJwt = 1;
    }
    async body() {
        return {
            'email': this.email,
            'phone': this.phone,
            'password': this.password,
            'verifyCode': this.verifyCode,
            'useJwt': this.useJwt,
            'provider': this.provider,
            'aaid': await AAID.getAAID()
        };
    }
}
