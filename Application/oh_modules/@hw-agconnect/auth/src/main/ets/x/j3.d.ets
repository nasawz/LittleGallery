import { AGConnectAuthCredential } from "../r";
import { SignInRequest } from "../e/i/w";
import { UserLinkRequest } from "../e/i/y3";
export declare abstract class OAuth2Credential implements AGConnectAuthCredential {
    protected autoCreateUser: boolean;
    getProvider(): number;
    /**
     * 此接口由内部使用
     *
     * @param request 登录请求
     */
    abstract prepareUserAuthRequest(request: SignInRequest): void;
    /**
     * 此接口由内部使用
     *
     * @param request 连接请求
     */
    abstract prepareUserLinkRequest(request: UserLinkRequest): void;
    isAutoCreateUser(): boolean;
    setAutoCreateUser(b4: boolean): void;
}
