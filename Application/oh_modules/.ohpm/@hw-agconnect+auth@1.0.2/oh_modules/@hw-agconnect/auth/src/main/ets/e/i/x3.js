import { AuthBaseRequest } from "./o3";
export class UserExtraRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-profile';
    }
}
