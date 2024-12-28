import { HwIdAuthCredential } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/s1/x/k3&1.0.2";
export class HwIdAuthProvider {
    static credentialWithToken(authCode) {
        return new HwIdAuthCredential(authCode);
    }
}
