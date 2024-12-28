export class VerifyCodeResultImpl {
    constructor(l3, validityPeriod) {
        this.shortestInterval = l3;
        this.validityPeriod = validityPeriod;
    }
    getShortestInterval() {
        return this.shortestInterval;
    }
    getValidityPeriod() {
        return this.validityPeriod;
    }
}
