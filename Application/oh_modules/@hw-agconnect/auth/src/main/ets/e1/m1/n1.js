import { AegisAes } from "../a2/b2";
export class DecryptExclamationMark {
    constructor(rxHex, ryHex, rzHex, slHex) {
        this.rxHex = rxHex;
        this.ryHex = ryHex;
        this.rzHex = rzHex;
        this.slHex = slHex;
    }
    static isMatch(cipher) {
        return DecryptExclamationMark.PATTERN_ENCRYPT.test(cipher);
    }
    async decrypt(raw) {
        if (this.isKeyValid()) {
            if (!this.aesKey) {
                this.aesKey = await AegisAes.buildKey(this.rxHex, this.ryHex, this.rzHex, this.slHex, DecryptExclamationMark.ITERATION_COUNT);
            }
        }
        let rawString = this.getRawString(raw);
        let ivEndIndex = DecryptExclamationMark.IV_LENGTH * 2 + 2;
        if (rawString && rawString.length > ivEndIndex) {
            let iv = rawString.substring(2, ivEndIndex);
            let cipher = rawString.substring(ivEndIndex);
            return AegisAes.decryptWithIv(this.aesKey, iv, cipher);
        }
        return '';
    }
    isKeyValid() {
        if (this.rxHex && this.ryHex && this.rzHex && this.slHex && this.rxHex.length >= 64) {
            return true;
        }
        return false;
    }
    getRawString(raw) {
        let array = raw.match(DecryptExclamationMark.PATTERN_ENCRYPT);
        if (array && array.length > 1) {
            return array[1];
        }
        return null;
    }
}
DecryptExclamationMark.PATTERN_ENCRYPT = new RegExp('^\\[!([A-Fa-f0-9]*)]');
DecryptExclamationMark.ITERATION_COUNT = 1000;
DecryptExclamationMark.IV_LENGTH = 16;
