import { HwIdAuthCredential } from "./k3";
export declare class HwIdAuthProvider {
    /**
     * 登录凭证构造器
     *
     * @param token 由HMS SDK授权后获得的authCode
     * @return 用于登录的凭证
     * @param autoCreateUser 是否创建账户
     */
    static credentialWithToken(authCode: string): HwIdAuthCredential;
}
