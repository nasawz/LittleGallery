import { BaseResponse } from "../../e1/p1/m2/q2";
import { TokenInfo } from "../../o/h3";
export interface AccessToken {
    token: string;
    validPeriod: number;
}
export interface RefreshTokenObject {
    productId: string;
    accessToken: AccessToken;
    uid: string;
}
export declare class RefreshTokenResponse extends BaseResponse {
    accessToken: TokenInfo;
    productId: string;
    uid: string;
    constructResponse(response: object): boolean;
}
