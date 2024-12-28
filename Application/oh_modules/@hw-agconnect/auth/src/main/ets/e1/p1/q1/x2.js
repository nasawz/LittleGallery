export class TokenImpl {
    constructor(expiration, tokenString) {
        this.expiration = expiration;
        this.tokenString = tokenString;
    }
}
