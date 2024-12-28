import { OAuth2Credential } from "../../x/j3";
import { SignInRequest } from "../../e/i/w";
import { UserLinkRequest } from "../../e/i/y3";
export declare class HwIdAuthCredential extends OAuth2Credential {
    private authCode;
    private TAG;
    constructor(authCode: string);
    getProvider(): number;
    prepareUserAuthRequest(request: SignInRequest): void;
    prepareUserLinkRequest(request: UserLinkRequest): void;
    private generateExtraData;
}
