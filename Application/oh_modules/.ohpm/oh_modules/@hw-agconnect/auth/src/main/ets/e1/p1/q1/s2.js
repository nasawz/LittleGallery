export class ClientTokenResponse {
    constructor(access_token, expires_in) {
        this.access_token = access_token;
        this.expires_in = expires_in;
    }
}
