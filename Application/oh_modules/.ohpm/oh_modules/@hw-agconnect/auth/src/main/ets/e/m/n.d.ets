import { BaseResponse } from "../../e1/p1/m2/q2";
export interface VerifyCodeObject {
    shortestInterval: string;
    validityPeriod: string;
}
export declare class VerifyCodeResponse extends BaseResponse {
    shortestInterval: string;
    validityPeriod: string;
    constructResponse(response: object): boolean;
}
