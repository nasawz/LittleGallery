export class TokenInfo {
    constructor() {
        this.token = '';
        this.validPeriod = 0;
    }
    getToken() {
        return this.token;
    }
    setToken(value) {
        this.token = value;
    }
    getValidPeriod() {
        return this.validPeriod;
    }
    setValidPeriod(value) {
        this.validPeriod = value;
    }
}
