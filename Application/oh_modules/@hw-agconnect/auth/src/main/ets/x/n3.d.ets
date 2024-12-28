import { ReauthenticateRequest } from "../e/i/p3";
import { SignInRequest } from "../e/i/w";
import { UserLinkRequest } from "../e/i/y3";
import { AccountCredential } from "./l3";
import { PhoneUser } from "../r";
export declare class PhoneAuthCredential extends AccountCredential {
    countryCode: string;
    phoneNumber: string;
    private TAG;
    constructor(c4: PhoneUser);
    getProvider(): number;
    prepareUserAuthRequest(request: SignInRequest): void;
    prepareUserReauthRequest(request: ReauthenticateRequest): void;
    prepareUserLinkRequest(request: UserLinkRequest): void;
    private generateExtraData;
}
