export class CredentialInfo {
    constructor(expiration, tokenString, lastRefreshTime) {
        this.TWO_MINUTES_EARLY = 2 * 60 * 1000;
        this.ONE_HOUR = 60 * 60 * 1000;
        this.expiration = expiration;
        this.tokenString = tokenString;
        this.lastRefreshTime = lastRefreshTime;
    }
    isValid() {
        let currentTime = new Date().getTime();
        let validTime = this.lastRefreshTime + this.expiration * 1000 - this.TWO_MINUTES_EARLY;
        return null != this.tokenString && currentTime <= validTime;
    }
    allowRefresh() {
        return new Date().getTime() - this.lastRefreshTime > this.ONE_HOUR;
    }
}
