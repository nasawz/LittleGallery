import cryptoFramework from '@ohos:security.cryptoFramework';
import { Uint8ArrayUtil } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/x1/z1&1.0.2";
export class FrameworkCrypto {
    static async ohGenAesCbcEncryptWithIv(plain, s1, iv) {
        if (!plain || !s1 || !iv) {
            return plain;
        }
        let result = '';
        let t1 = cryptoFramework.createSymKeyGenerator('AES256');
        let u1 = { data: Uint8ArrayUtil.hexStringToUint8Array(s1) };
        let v1 = await t1.convertKey(u1);
        let w1 = 'AES256|CBC|PKCS5';
        let params = {
            iv: { data: Uint8ArrayUtil.hexStringToUint8Array(iv) },
            algName: 'IvParamsSpec'
        };
        let z1 = cryptoFramework.createCipher(w1);
        await z1.init(cryptoFramework.CryptoMode.ENCRYPT_MODE, v1, params);
        let cipherText = { data: Uint8ArrayUtil.stringToUint8Array(plain) };
        let a2 = await z1.update(cipherText);
        if (a2 && a2.data) {
            result += Uint8ArrayUtil.uint8ArrayTohexString(a2.data);
        }
        let b2 = await z1.doFinal(null);
        if (b2 && b2.data) {
            result += Uint8ArrayUtil.uint8ArrayTohexString(b2.data);
        }
        return result;
    }
    static async ohGenAesCbcDecryptWithIv(plain, j1, iv) {
        if (!plain || !j1 || !iv) {
            return plain;
        }
        let result = '';
        let k1 = cryptoFramework.createSymKeyGenerator('AES256');
        let l1 = { data: Uint8ArrayUtil.hexStringToUint8Array(j1) };
        let m1 = await k1.convertKey(l1);
        let n1 = 'AES256|CBC|PKCS5';
        let params = {
            iv: { data: Uint8ArrayUtil.hexStringToUint8Array(iv) },
            algName: 'IvParamsSpec'
        };
        let o1 = cryptoFramework.createCipher(n1);
        await o1.init(cryptoFramework.CryptoMode.DECRYPT_MODE, m1, params);
        let cipherText = { data: Uint8ArrayUtil.hexStringToUint8Array(plain) };
        let p1 = await o1.update(cipherText);
        if (p1 && p1.data) {
            result += Uint8ArrayUtil.uint8ArrayToString(p1.data);
        }
        let q1 = await o1.doFinal(null);
        if (q1 && q1.data) {
            result += Uint8ArrayUtil.uint8ArrayToString(q1.data);
        }
        return result;
    }
}
