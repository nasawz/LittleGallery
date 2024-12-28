import fs from '@ohos:file.fs';
import { Logger } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/f1/g1&1.0.2";
export class FileStored {
    static async readFile(context, fileName, key) {
        let file = context.filesDir + '/' + fileName + '/' + key;
        if (!context) {
            return Promise.resolve('');
        }
        if (!fs.accessSync(file)) {
            return Promise.resolve('');
        }
        let result = fs.readTextSync(file);
        return Promise.resolve(result);
    }
    static async writeFile(context, fileName, key, value) {
        let filePath = context.filesDir + '/' + fileName;
        if (!context) {
            return Promise.resolve();
        }
        if (!fs.accessSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        return new Promise((h4, i4) => {
            let j4 = filePath + '/' + key;
            let file = fs.openSync(j4, fs.OpenMode.READ_WRITE | fs.OpenMode.CREATE);
            try {
                fs.truncateSync(file.fd);
                fs.writeSync(file.fd, value);
                h4();
            }
            catch (err) {
                Logger.error('FileStore', 'write file error' + err);
                i4(err);
            }
            finally {
                fs.closeSync(file);
            }
        });
    }
    static async deleteFile(context, fileName, key) {
        let filePath = context.filesDir + '/' + fileName + '/' + key;
        if (fs.accessSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return Promise.resolve();
    }
}
