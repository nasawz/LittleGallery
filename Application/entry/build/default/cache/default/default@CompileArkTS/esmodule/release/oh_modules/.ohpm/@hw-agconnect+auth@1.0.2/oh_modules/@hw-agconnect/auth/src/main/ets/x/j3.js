export class OAuth2Credential {
    constructor() {
        this.autoCreateUser = true;
    }
    getProvider() {
        return -1;
    }
    isAutoCreateUser() {
        return this.autoCreateUser;
    }
    setAutoCreateUser(b4) {
        this.autoCreateUser = b4;
    }
}
