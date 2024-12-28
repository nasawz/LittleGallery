import { EmailUserBuilder } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/f3&1.0.2";
import { EmailAuthCredential } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/x/m3&1.0.2";
export class EmailAuthProvider {
    static credentialWithPassword(email, password) {
        let a4 = new EmailUserBuilder().setEmail(email).setPassword(password).build();
        return new EmailAuthCredential(a4);
    }
    static credentialWithVerifyCode(email, y3) {
        let z3 = new EmailUserBuilder().setEmail(email).setVerifyCode(y3).build();
        return new EmailAuthCredential(z3);
    }
    static credentialWithPasswordAndVerifyCode(email, password, w3) {
        let x3 = new EmailUserBuilder()
            .setEmail(email)
            .setPassword(password)
            .setVerifyCode(w3)
            .build();
        return new EmailAuthCredential(x3);
    }
}
