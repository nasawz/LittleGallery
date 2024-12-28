import { PhoneUtil } from "../k/l";
export class PhoneUserBuilder {
    constructor() {
        this.countryCode = '';
        this.phoneNumber = '';
        this.password = '';
        this.verifyCode = '';
    }
    setCountryCode(countryCode) {
        this.countryCode = countryCode;
        return this;
    }
    setPhoneNumber(phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }
    setPassword(password) {
        this.password = password;
        return this;
    }
    setVerifyCode(c3) {
        this.verifyCode = c3;
        return this;
    }
    build() {
        return {
            countryCode: this.countryCode,
            phoneNumber: this.phoneNumber,
            password: this.password,
            verifyCode: this.verifyCode,
            getPhone() {
                return PhoneUtil.combinatePhone(this.countryCode, this.phoneNumber);
            }
        };
    }
}
