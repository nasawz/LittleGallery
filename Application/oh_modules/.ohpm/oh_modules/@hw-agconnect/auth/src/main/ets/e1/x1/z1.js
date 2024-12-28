import buffer from '@ohos.buffer';
import util from '@ohos.util';
import { Logger } from "../f1/g1";
import { BufferEncoder } from "./c3";
export class Uint8ArrayUtil {
    static hexStringToUint8Array(q2) {
        return Uint8Array.from(q2.match(/.{1,2}/g).map(s2 => parseInt(s2, 16)));
    }
    static uint8ArrayTohexString(array) {
        return buffer.from(array).toString('hex');
    }
    static uint8ArrayToString(array) {
        return buffer.from(array).toString('utf8');
    }
    static stringToUint8Array(str) {
        try {
            return new util.TextEncoder('utf-8').encodeInto(str);
        }
        catch (e) {
            Logger.error('stringToUint8Array', 'TextEncoder error');
            let o2 = new BufferEncoder();
            o2.pushStringWithUtf8(str);
            return o2.toUint8Array();
        }
    }
    static bytesToHex(l2) {
        if (!l2 || l2.length === 0) {
            throw new Error('bytes can not be null.');
        }
        let m2 = [];
        for (let n2 = 0; n2 < l2.length; n2++) {
            let current = l2[n2] < 0 ? l2[n2] + 256 : l2[n2];
            m2.push((current >>> 4).toString(16));
            m2.push((current & 0xf).toString(16));
        }
        return m2.join('').toUpperCase();
    }
    static hexToBytes(j2) {
        if (!j2) {
            throw new Error('hex can not be null.');
        }
        let k2 = new Int8Array(j2.length / 2);
        for (let c = 0; c < j2.length; c += 2) {
            let value = parseInt(j2.substring(c, c + 2), 16);
            k2[c / 2] = value < 128 ? value : value - 256;
        }
        return k2;
    }
}
