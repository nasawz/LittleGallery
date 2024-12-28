import { AuthBaseRequest } from "./o3";
export class UserUnlinkRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-unlink';
        this.provider = -1;
    }
    getProvider() {
        return this.provider;
    }
    setProvider(provider) {
        this.provider = provider;
    }
    queryParam() {
        return super.queryParam() + '&provider=' + this.provider;
    }
}
