import { HwIdAuthCredential } from "./k3";
export class HwIdAuthProvider {
    static credentialWithToken(authCode) {
        return new HwIdAuthCredential(authCode);
    }
}
