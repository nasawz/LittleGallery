import huks from "@ohos.security.huks";
import { AuthImpl } from "../a";
export class HuksManager {
    constructor() {
        this.deriveHkdfInData = 'deriveHkdfIndata';
        this.handle = undefined;
        this.huksKeyDeriveKeySize = 32;
        this.huksOptions = undefined;
        this.finishOptions = undefined;
        this.initOptions = undefined;
    }
    static getKeyAlies() {
        return 'agconnect_auth_keyAlies' + AuthImpl.getInstance().getRegion();
    }
    static stringToUint8Array(str) {
        let arr = new Array();
        for (let c7 = 0, d7 = str.length; c7 < d7; ++c7) {
            arr.push(str.charCodeAt(c7));
        }
        return new Uint8Array(arr);
    }
    static uint8ArrayToString(z6) {
        let a7 = '';
        for (let b7 = 0; b7 < z6.length; b7++) {
            a7 += String.fromCharCode(z6[b7]);
        }
        return a7;
    }
    async publicGenKeyFunc(keyAlias) {
        console.info(`enter promise generateKeyItem`);
        let w6 = { i: false };
        try {
            await this.generateKeyItem(keyAlias, this.huksOptions, w6)
                .then((data) => {
                console.info(`promise: generateKeyItem success, data = ${JSON.stringify(data)}`);
            })
                .catch((error) => {
                if (w6.i) {
                    throw error;
                }
                else {
                    console.error(`promise: generateKeyItem failed` + error);
                }
            });
        }
        catch (error) {
            console.error(`promise: generateKeyItem input arg invalid` + error);
        }
    }
    async publicInitFunc(keyAlias) {
        console.info(`enter promise doInit`);
        let t6 = { i: false };
        try {
            await this.initSession(keyAlias, this.initOptions, t6)
                .then((data) => {
                console.info(`promise: doInit success, data = ${JSON.stringify(data)}`);
                this.handle = data.handle;
            })
                .catch((error) => {
                if (t6.i) {
                    throw error;
                }
                else {
                    console.error(`promise: doInit failed` + error);
                }
            });
        }
        catch (error) {
            console.error(`promise: doInit input arg invalid` + error);
        }
    }
    async publicUpdateFunc() {
        console.info(`enter promise doUpdate`);
        let q6 = { i: false };
        try {
            await this.updateSession(this.handle, this.initOptions, q6)
                .then((data) => {
                console.info(`promise: doUpdate success, data = ${JSON.stringify(data)}`);
            })
                .catch((error) => {
                if (q6.i) {
                    throw error;
                }
                else {
                    console.error(`promise: doUpdate failed` + error);
                }
            });
        }
        catch (error) {
            console.error(`promise: doUpdate input arg invalid` + error);
        }
    }
    async publicFinishFunc() {
        console.info(`enter promise doFinish`);
        let n6 = { i: false };
        try {
            await this.finishSession(this.handle, this.finishOptions, n6)
                .then((data) => {
                console.info(`promise: doFinish success, data = ${JSON.stringify(data)}`);
            })
                .catch((error) => {
                if (n6.i) {
                    throw error;
                }
                else {
                    console.error(`promise: doFinish failed` + error);
                }
            });
        }
        catch (error) {
            console.error(`promise: doFinish input arg invalid` + error);
        }
    }
    async publicDeleteKeyFunc(keyAlias) {
        console.info(`enter promise deleteKeyItem`);
        let k6 = { i: false };
        let huksOptions = {
            properties: []
        };
        try {
            await this.deleteKeyItem(keyAlias, huksOptions, k6)
                .then((data) => {
                console.info(`promise: deleteKeyItem key success, data = ${JSON.stringify(data)}`);
            })
                .catch((error) => {
                if (k6.i) {
                    throw error;
                }
                else {
                    console.error(`promise: deleteKeyItem failed` + error);
                }
            });
        }
        catch (error) {
            console.error(`promise: deleteKeyItem input arg invalid` + error);
        }
    }
    async initDeriveKey(keyAlias) {
        this.init(keyAlias);
        await this.publicGenKeyFunc(keyAlias);
        await this.publicInitFunc(keyAlias);
        this.initOptions.inData = HuksManager.stringToUint8Array(this.deriveHkdfInData);
        await this.publicUpdateFunc();
        await this.publicFinishFunc();
    }
    getAesEncryptProperties(nonce, iv) {
        let properties = new Array();
        let index = 0;
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
            value: huks.HuksKeyAlg.HUKS_ALG_AES
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
            value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_PURPOSE,
            value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_PADDING,
            value: huks.HuksKeyPadding.HUKS_PADDING_NONE
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
            value: huks.HuksCipherMode.HUKS_MODE_GCM
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_IV,
            value: HuksManager.stringToUint8Array(iv)
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_NONCE,
            value: HuksManager.stringToUint8Array(nonce)
        };
        return properties;
    }
    getAesDecryptProperties(j6, nonce, iv) {
        let properties = new Array();
        let index = 0;
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
            value: huks.HuksKeyAlg.HUKS_ALG_AES
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
            value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_PURPOSE,
            value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_PADDING,
            value: huks.HuksKeyPadding.HUKS_PADDING_NONE
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
            value: huks.HuksCipherMode.HUKS_MODE_GCM
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_NONCE,
            value: HuksManager.stringToUint8Array(nonce)
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_IV,
            value: HuksManager.stringToUint8Array(iv)
        };
        properties[index++] = {
            tag: huks.HuksTag.HUKS_TAG_AE_TAG,
            value: j6.slice(j6.length - 16)
        };
        return properties;
    }
    async encryptData(plainText, keyAlias, nonce, iv) {
        let hasKey = await this.hasKeyAlies(keyAlias);
        if (!hasKey) {
            await this.initDeriveKey(keyAlias);
        }
        let options = {
            properties: this.getAesEncryptProperties(nonce, iv),
            inData: HuksManager.stringToUint8Array(plainText)
        };
        await huks.initSession(keyAlias, options)
            .then((data) => {
            this.handle = data.handle;
        }).catch((error) => {
            console.error(`promise: init EncryptData failed` + error);
        });
        return new Promise((f6, g6) => {
            huks.finishSession(this.handle, options)
                .then((data) => {
                console.info(`promise: encrypt data success, data is ` +
                    HuksManager.uint8ArrayToString(data.outData));
                if (data.outData) {
                    f6(data.outData);
                }
            }).catch((error) => {
                g6(error);
            });
        });
    }
    async decryptData(s5, keyAlias, nonce, iv) {
        if (s5.length === 0) {
            return Promise.resolve(null);
        }
        let t5 = this.getAesDecryptProperties(s5, nonce, iv);
        let options = {
            properties: t5,
            inData: s5.slice(0, s5.length - 16)
        };
        return new Promise((v5, w5) => {
            huks.initSession(keyAlias, options)
                .then((data) => {
                this.handle = data.handle;
                huks.finishSession(this.handle, options)
                    .then((data) => {
                    if (data && data.outData) {
                        let b6 = HuksManager.uint8ArrayToString(data.outData);
                        v5(b6);
                    }
                    else {
                        v5(null);
                    }
                }).catch((error) => {
                    w5(error);
                });
            }).catch((error) => {
                console.error(`promise: init DecryptData failed` + error);
                v5(null);
            });
        });
    }
    async generateKeyItem(keyAlias, huksOptions, n5) {
        return new Promise((p5, q5) => {
            try {
                huks.generateKeyItem(keyAlias, huksOptions, (error, data) => {
                    if (error) {
                        q5(error);
                    }
                    else {
                        p5(data);
                    }
                });
            }
            catch (error) {
                n5.i = true;
                throw error;
            }
        });
    }
    async initSession(keyAlias, huksOptions, i5) {
        return new Promise((k5, l5) => {
            try {
                huks.initSession(keyAlias, huksOptions, (error, data) => {
                    if (error) {
                        l5(error);
                    }
                    else {
                        k5(data);
                    }
                });
            }
            catch (error) {
                i5.i = true;
                throw error;
            }
        });
    }
    async updateSession(handle, huksOptions, d5) {
        return new Promise((f5, g5) => {
            try {
                huks.updateSession(handle, huksOptions, (error, data) => {
                    if (error) {
                        g5(error);
                    }
                    else {
                        f5(data);
                    }
                });
            }
            catch (error) {
                d5.i = true;
                throw error;
            }
        });
    }
    async finishSession(handle, huksOptions, y4) {
        return new Promise((a5, b5) => {
            try {
                huks.finishSession(handle, huksOptions, (error, data) => {
                    if (error) {
                        b5(error);
                    }
                    else {
                        a5(data);
                    }
                });
            }
            catch (error) {
                y4.i = true;
                throw error;
            }
        });
    }
    async deleteKeyItem(keyAlias, huksOptions, t4) {
        return new Promise((v4, w4) => {
            try {
                huks.deleteKeyItem(keyAlias, huksOptions, (error, data) => {
                    if (error) {
                        w4(error);
                    }
                    else {
                        v4(data);
                    }
                });
            }
            catch (error) {
                t4.i = true;
                throw error;
            }
        });
    }
    init(keyAlias) {
        let properties = new Array();
        properties[0] = {
            tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
            value: huks.HuksKeyAlg.HUKS_ALG_AES,
        };
        properties[1] = {
            tag: huks.HuksTag.HUKS_TAG_PURPOSE,
            value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DERIVE,
        };
        properties[2] = {
            tag: huks.HuksTag.HUKS_TAG_DIGEST,
            value: huks.HuksKeyDigest.HUKS_DIGEST_SHA256,
        };
        properties[3] = {
            tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
            value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128,
        };
        properties[4] = {
            tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
            value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
        };
        this.huksOptions = {
            properties: properties,
            inData: new Uint8Array(new Array())
        };
        let r4 = new Array();
        r4[0] = {
            tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
            value: huks.HuksKeyAlg.HUKS_ALG_HKDF,
        };
        r4[1] = {
            tag: huks.HuksTag.HUKS_TAG_PURPOSE,
            value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DERIVE,
        };
        r4[2] = {
            tag: huks.HuksTag.HUKS_TAG_DIGEST,
            value: huks.HuksKeyDigest.HUKS_DIGEST_SHA256,
        };
        r4[3] = {
            tag: huks.HuksTag.HUKS_TAG_DERIVE_KEY_SIZE,
            value: this.huksKeyDeriveKeySize,
        };
        this.initOptions = {
            properties: r4,
            inData: new Uint8Array(new Array())
        };
        let s4 = new Array();
        s4[0] = {
            tag: huks.HuksTag.HUKS_TAG_DERIVED_AGREED_KEY_STORAGE_FLAG,
            value: huks.HuksKeyStorageType.HUKS_STORAGE_ONLY_USED_IN_HUKS,
        };
        s4[1] = {
            tag: huks.HuksTag.HUKS_TAG_IS_KEY_ALIAS,
            value: true,
        };
        s4[2] = {
            tag: huks.HuksTag.HUKS_TAG_ALGORITHM,
            value: huks.HuksKeyAlg.HUKS_ALG_AES,
        };
        s4[3] = {
            tag: huks.HuksTag.HUKS_TAG_KEY_SIZE,
            value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_256,
        };
        s4[4] = {
            tag: huks.HuksTag.HUKS_TAG_PURPOSE,
            value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT |
                huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT,
        };
        s4[5] = {
            tag: huks.HuksTag.HUKS_TAG_DIGEST,
            value: huks.HuksKeyDigest.HUKS_DIGEST_SHA256,
        };
        s4[6] = {
            tag: huks.HuksTag.HUKS_TAG_KEY_ALIAS,
            value: HuksManager.stringToUint8Array(keyAlias),
        };
        s4[7] = {
            tag: huks.HuksTag.HUKS_TAG_PADDING,
            value: huks.HuksKeyPadding.HUKS_PADDING_NONE,
        };
        s4[8] = {
            tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE,
            value: huks.HuksCipherMode.HUKS_MODE_GCM,
        };
        this.finishOptions = {
            properties: s4,
            inData: new Uint8Array(new Array())
        };
    }
    async hasKeyAlies(m4) {
        let huksOptions = {
            properties: []
        };
        return new Promise((o4, p4) => {
            try {
                huks.hasKeyItem(m4, huksOptions, (error, data) => {
                    if (error) {
                        p4(error);
                    }
                    else {
                        if (data !== null && data.valueOf() !== null) {
                            o4(data.valueOf());
                        }
                    }
                });
            }
            catch (error) {
                p4(error);
            }
        });
    }
}
class l4 {
    constructor() {
        this.i = false;
    }
}
