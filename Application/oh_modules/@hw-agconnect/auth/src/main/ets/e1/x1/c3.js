export class BufferEncoder {
    constructor() {
        this.buffer = [];
        this.readOffset = 0;
    }
    pushUint8(value) {
        if (value > 255) {
            throw Error('value need <= 255');
        }
        this.buffer.push(value);
    }
    pushUnicodeWithUtf8(value) {
        if (value <= 0x7F) {
            this.pushUint8(value);
        }
        else if (value <= 0xFF) {
            this.pushUint8((value >> 6) | 0xC0);
            this.pushUint8((value & 0x3F) | 0x80);
        }
        else if (value <= 0xFFFF) {
            this.pushUint8((value >> 12) | 0xE0);
            this.pushUint8(((value >> 6) & 0x3F) | 0x80);
            this.pushUint8((value & 0x3F) | 0x80);
        }
        else if (value <= 0x1FFFFF) {
            this.pushUint8((value >> 18) | 0xF0);
            this.pushUint8(((value >> 12) & 0x3F) | 0x80);
            this.pushUint8(((value >> 6) & 0x3F) | 0x80);
            this.pushUint8((value & 0x3F) | 0x80);
        }
        else if (value <= 0x3FFFFFF) {
            this.pushUint8((value >> 24) | 0xF8);
            this.pushUint8(((value >> 18) & 0x3F) | 0x80);
            this.pushUint8(((value >> 12) & 0x3F) | 0x80);
            this.pushUint8(((value >> 6) & 0x3F) | 0x80);
            this.pushUint8((value & 0x3F) | 0x80);
        }
        else {
            this.pushUint8((value >> 30) & 0x1 | 0xFC);
            this.pushUint8(((value >> 24) & 0x3F) | 0x80);
            this.pushUint8(((value >> 18) & 0x3F) | 0x80);
            this.pushUint8(((value >> 12) & 0x3F) | 0x80);
            this.pushUint8(((value >> 6) & 0x3F) | 0x80);
            this.pushUint8((value & 0x3F) | 0x80);
        }
    }
    parseUnicodeFromUtf16(h2, i2) {
        if ((h2 & 0xFC00) === 0xD800 && (i2 & 0xFC00) === 0xDC00) {
            return { unicode: (((h2 & 0x3FF) << 10) | (i2 & 0x3FF)) + 0x10000, ok: true };
        }
        return { ok: false };
    }
    pushStringWithUtf8(value) {
        let c2 = this.buffer.length;
        for (let d2 = 0; d2 < value.length; d2++) {
            let e2 = value.charCodeAt(d2);
            if (e2 < 128) {
                this.pushUnicodeWithUtf8(e2);
            }
            else if (e2 < 2048) {
                this.pushUnicodeWithUtf8(e2);
            }
            else {
                let f2 = value.charCodeAt(d2 + 1);
                let g2 = this.parseUnicodeFromUtf16(e2, f2);
                if (g2.ok) {
                    this.pushUnicodeWithUtf8(g2.unicode);
                    d2++;
                }
                else {
                    this.pushUnicodeWithUtf8(e2);
                }
            }
        }
        return this.buffer.length - c2;
    }
    toUint8Array(len) {
        len = len || this.buffer.length;
        return new Uint8Array(this.buffer.slice(this.readOffset, this.readOffset + len));
    }
}
