import { EmailUser } from "../r";
export declare class EmailUserBuilder {
    private email;
    private password;
    private verifyCode;
    setEmail(email: string): EmailUserBuilder;
    setPassword(password: string): EmailUserBuilder;
    setVerifyCode(b3: string): EmailUserBuilder;
    build(): EmailUser;
}
