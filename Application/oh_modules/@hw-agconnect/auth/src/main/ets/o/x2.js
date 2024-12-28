export var TokenState;
(function (f3) {
    f3[f3["SIGNED_IN"] = 0] = "SIGNED_IN";
    f3[f3["TOKEN_UPDATED"] = 1] = "TOKEN_UPDATED";
    f3[f3["TOKEN_INVALID"] = 2] = "TOKEN_INVALID";
    f3[f3["SIGNED_OUT"] = 3] = "SIGNED_OUT";
})(TokenState || (TokenState = {}));
export class TokenImpl {
    constructor(expiration, e3) {
        this.state = undefined;
        this.expiration = expiration;
        this.tokenString = e3;
    }
    getString() {
        return this.tokenString;
    }
    getExpirePeriod() {
        return this.expiration;
    }
    getState() {
        return this.state;
    }
    getToken() {
        return this.tokenString;
    }
}
