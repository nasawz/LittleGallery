import { AuthBaseRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/o3&1.0.2";
export class UpdateProfileRequest extends AuthBaseRequest {
    constructor() {
        super(...arguments);
        this.URL_PATH_SURFFIX = '/user-profile';
        this.displayName = '';
        this.photoUrl = '';
    }
    setDisplayName(displayName) {
        this.displayName = displayName;
    }
    setPhotoUrl(photoUrl) {
        this.photoUrl = photoUrl;
    }
    async body() {
        return {
            'displayName': this.displayName,
            'photoUrl': this.photoUrl
        };
    }
}
