import { PhoneUser } from "../r";
export declare class PhoneUserBuilder {
    private countryCode;
    private phoneNumber;
    private password;
    private verifyCode;
    setCountryCode(countryCode: string): PhoneUserBuilder;
    setPhoneNumber(phoneNumber: string): PhoneUserBuilder;
    setPassword(password: string): PhoneUserBuilder;
    setVerifyCode(c3: string): PhoneUserBuilder;
    build(): PhoneUser;
}
