import { PhoneUserBuilder } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/g3&1.0.2";
import { PhoneAuthCredential } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/x/n3&1.0.2";
export class PhoneAuthProvider {
    static credentialWithPassword(countryCode, phoneNumber, password) {
        let user = new PhoneUserBuilder()
            .setCountryCode(countryCode)
            .setPhoneNumber(phoneNumber)
            .setPassword(password)
            .build();
        return new PhoneAuthCredential(user);
    }
    static credentialWithVerifyCode(countryCode, phoneNumber, f4) {
        let user = new PhoneUserBuilder()
            .setCountryCode(countryCode)
            .setPhoneNumber(phoneNumber)
            .setVerifyCode(f4)
            .build();
        return new PhoneAuthCredential(user);
    }
    static credentialWithPasswordAndVerifyCode(countryCode, phoneNumber, password, d4) {
        let e4 = new PhoneUserBuilder()
            .setCountryCode(countryCode)
            .setPhoneNumber(phoneNumber)
            .setPassword(password)
            .setVerifyCode(d4)
            .build();
        return new PhoneAuthCredential(e4);
    }
}