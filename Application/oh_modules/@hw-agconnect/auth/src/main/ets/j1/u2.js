import { AuthImpl } from "../a";
import { Logger } from "../e1/f1/g1";
import { FileStored } from "./k4";
import { HuksManager } from "./t2";
import { Preferences } from "./l4";
import { Random } from "./m4";
const TAG = 'StoredManager';
export class StoredManager {
    constructor(name, region, keyAlias) {
        this.DEFAULT_FILE_NAME = 'auth_storedManager';
        this.huskManager = new HuksManager();
        this.name = name;
        this.region = region;
        if (keyAlias) {
            this.keyAlias = keyAlias;
        }
    }
    async saveToPfStorage(m7) {
        let context = AuthImpl.getInstance().appContext;
        let fileName = this.DEFAULT_FILE_NAME + '_' + this.region + '_' + this.name;
        if (m7 == null) {
            Logger.info(TAG, 'clear storage user');
            return Promise.resolve();
        }
        if (this.keyAlias) {
            let key = this.name + '_' + this.keyAlias;
            let nonce = Random.getRandom(8);
            let iv = Random.getRandom(6);
            let encrypt = await this.huskManager.encryptData(m7, this.keyAlias, nonce, iv);
            await Preferences.put(context, fileName, key, encrypt);
            await Preferences.put(context, fileName, 'nonce', nonce);
            await Preferences.put(context, fileName, 'iv', iv);
        }
        else {
            let key = this.name + '_sp';
            await Preferences.put(context, fileName, key, m7);
        }
        return Promise.resolve();
    }
    async loadFromPfStorage() {
        let context = AuthImpl.getInstance().appContext;
        let fileName = this.DEFAULT_FILE_NAME + '_' + this.region + '_' + this.name;
        if (this.keyAlias) {
            let key = this.name + '_' + this.keyAlias;
            let nonce = await Preferences.get(context, fileName, 'nonce');
            let iv = await Preferences.get(context, fileName, 'iv');
            let k7 = await Preferences.get(context, fileName, key);
            let l7 = await this.huskManager.decryptData(k7, this.keyAlias, nonce, iv);
            if (k7 && l7) {
                return Promise.resolve(l7);
            }
            return Promise.resolve(null);
        }
        else {
            let key = this.name + '_sp';
            let data = await Preferences.get(context, fileName, key);
            if (data) {
                return Promise.resolve(data);
            }
            return Promise.resolve(null);
        }
    }
    async deletePfData() {
        let key = '';
        if (this.keyAlias) {
            key = this.name + '_' + this.keyAlias;
        }
        else {
            key = this.name + '_sp';
        }
        let context = AuthImpl.getInstance().appContext;
        let fileName = this.DEFAULT_FILE_NAME + '_' + this.region + '_' + this.name;
        return Preferences.delete(context, fileName, key);
    }
    async saveToFileStorage(j7) {
        let context = AuthImpl.getInstance().appContext;
        let fileName = this.DEFAULT_FILE_NAME + '_' + this.region + '_' + this.name;
        if (j7 == null) {
            Logger.info(TAG, 'clear storage user');
            return Promise.resolve();
        }
        if (this.keyAlias) {
            let key = this.name + '_' + this.keyAlias;
            let nonce = Random.getRandom(8);
            let iv = Random.getRandom(6);
            let encrypt = await this.huskManager.encryptData(j7, this.keyAlias, nonce, iv);
            await FileStored.writeFile(context, fileName, key, HuksManager.uint8ArrayToString(encrypt));
            await FileStored.writeFile(context, fileName, 'nonce', nonce);
            await FileStored.writeFile(context, fileName, 'iv', iv);
        }
        else {
            let key = this.name + '_fs';
            await FileStored.writeFile(context, fileName, key, j7);
        }
        return Promise.resolve();
    }
    async loadFromFileStorage() {
        let context = AuthImpl.getInstance().appContext;
        let fileName = this.DEFAULT_FILE_NAME + '_' + this.region + '_' + this.name;
        if (this.keyAlias) {
            let key = this.name + '_' + this.keyAlias;
            let nonce = await FileStored.readFile(context, fileName, 'nonce');
            let iv = await FileStored.readFile(context, fileName, 'iv');
            let h7 = await FileStored.readFile(context, fileName, key);
            let i7 = await this.huskManager.decryptData(HuksManager.stringToUint8Array(h7), this.keyAlias, nonce, iv);
            if (h7 && i7) {
                return Promise.resolve(i7);
            }
            return Promise.resolve(null);
        }
        else {
            let key = this.name + '_fs';
            let data = await FileStored.readFile(context, fileName, key).toString();
            if (data) {
                return Promise.resolve(data);
            }
            return Promise.resolve(null);
        }
    }
    async deleteFileData() {
        let key = '';
        if (this.keyAlias) {
            key = this.name + '_' + this.keyAlias;
        }
        else {
            key = this.name + '_fs';
        }
        let context = AuthImpl.getInstance().appContext;
        let fileName = this.DEFAULT_FILE_NAME + '_' + this.region + '_' + this.name;
        return FileStored.deleteFile(context, fileName, key);
    }
}
