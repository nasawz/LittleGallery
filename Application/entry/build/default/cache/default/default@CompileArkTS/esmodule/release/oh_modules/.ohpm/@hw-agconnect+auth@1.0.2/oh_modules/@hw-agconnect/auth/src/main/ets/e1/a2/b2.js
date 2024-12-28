import { FrameworkCrypto } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/a2/w1&1.0.2";
import buffer from "@ohos:buffer";
import cryptoFramework from "@ohos:security.cryptoFramework";
import { getKey } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/x1/y1&1.0.2";
import { Uint8ArrayUtil } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/x1/z1&1.0.2";
export class AegisAes {
    static async buildKey(c1, d1, e1, f1, g1) {
        let password = getKey(Uint8ArrayUtil.hexToBytes(c1), Uint8ArrayUtil.hexToBytes(d1), Uint8ArrayUtil.hexToBytes(e1));
        let spec = {
            algName: 'PBKDF2',
            password: Uint8ArrayUtil.bytesToHex(password),
            salt: new Uint8Array(buffer.from(f1, 'hex').buffer),
            iterations: g1,
            keySize: 32
        };
        let h1 = cryptoFramework.createKdf('PBKDF2|SHA256');
        let i1 = await h1.generateSecret(spec);
        return AegisAes.uint8ArrayToHexStr(i1.data);
    }
    static async decryptWithIv(u, a1, b1) {
        let result = await FrameworkCrypto.ohGenAesCbcDecryptWithIv(b1, u, a1);
        if (result === undefined || result === '') {
            return b1;
        }
        return result;
    }
    static async encryptWithIv(m, o, t) {
        let result = await FrameworkCrypto.ohGenAesCbcEncryptWithIv(t, m, o);
        return result ? result : t;
    }
    static uint8ArrayToHexStr(data) {
        let i = '';
        let j;
        for (j = 0; j < data.length; j++) {
            let char = ('00' + data[j].toString(16)).slice(-2);
            i += char;
        }
        return i;
    }
}
