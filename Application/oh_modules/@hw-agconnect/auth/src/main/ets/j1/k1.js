import { HuksManager } from "./t2";
import { StoredManager } from "./u2";
export class UserStored {
    constructor(region) {
        this.name = 'authUser';
        this.region = region;
    }
    async saveUser(info) {
        let p7 = new StoredManager(this.name, this.region, HuksManager.getKeyAlies());
        await p7.saveToFileStorage(info);
    }
    async getLocalUser() {
        let o7 = new StoredManager(this.name, this.region, HuksManager.getKeyAlies());
        let data = await o7.loadFromFileStorage();
        if (data === null) {
            return null;
        }
        return JSON.parse(data);
    }
    async deleteUserInfo() {
        let n7 = new StoredManager(this.name, this.region, HuksManager.getKeyAlies());
        await n7.deleteFileData();
    }
}
