import { AuthBaseRequest } from "./o3";
export class DeleteUserRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-delete';
    }
}
