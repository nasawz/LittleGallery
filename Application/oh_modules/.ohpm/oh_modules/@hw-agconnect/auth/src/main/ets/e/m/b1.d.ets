import { BaseResponse } from "../../e1/p1/m2/q2";
import { TokenInfo } from "../../o/h3";
import { UserInfo } from "../../o/i3";
export interface AccessToken {
    token: string;
    validPeriod: number;
}
export interface RefreshToken {
    token: string;
    validPeriod: number;
}
export interface AnonymousObject {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    uid: string;
}
export declare class SignInAnonymousResponse extends BaseResponse {
    uid: string;
    private accessToken;
    private refreshToken;
    private userInfo;
    constructResponse(response: object): boolean;
    getAccessToken(): TokenInfo;
    setAccessToken(accessToken: TokenInfo): void;
    getRefreshToken(): TokenInfo;
    setRefreshToken(refreshToken: TokenInfo): void;
    getUserInfo(): UserInfo;
}
