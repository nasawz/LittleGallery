import { ReauthenticateRequest } from "../e/i/p3";
import { SignInRequest } from "../e/i/w";
import { UserLinkRequest } from "../e/i/y3";
import { AccountCredential } from "./l3";
import { EmailUser } from "../r";
export declare class EmailAuthCredential extends AccountCredential {
    email: string;
    private TAG;
    constructor(v3: EmailUser);
    getProvider(): number;
    prepareUserAuthRequest(request: SignInRequest): void;
    prepareUserReauthRequest(request: ReauthenticateRequest): void;
    prepareUserLinkRequest(request: UserLinkRequest): void;
    private generateExtraData;
}
