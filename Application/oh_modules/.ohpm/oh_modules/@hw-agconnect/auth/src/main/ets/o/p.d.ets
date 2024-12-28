import { VerifyCodeResult } from "../b";
export declare class VerifyCodeResultImpl implements VerifyCodeResult {
    private shortestInterval;
    private validityPeriod;
    constructor(l3: string, validityPeriod: string);
    getShortestInterval(): string;
    getValidityPeriod(): string;
}
