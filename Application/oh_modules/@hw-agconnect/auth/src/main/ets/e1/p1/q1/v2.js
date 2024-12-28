import { AuthImpl } from "../../../a";
import { HuksManager } from "../../../j1/t2";
import { StoredManager } from "../../../j1/u2";
export class ClientTokenStored {
    constructor() {
        this.name = 'ohos_agc_credential_api12';
    }
    async saveClientToken(info) {
        let storeManager = new StoredManager(this.name, AuthImpl.getInstance().getRegion(), HuksManager.getKeyAlies());
        await storeManager.saveToPfStorage(info);
    }
    async getLocalClientToken() {
        let storeManager = new StoredManager(this.name, AuthImpl.getInstance().getRegion(), HuksManager.getKeyAlies());
        let data = await storeManager.loadFromPfStorage();
        if (data == null) {
            return null;
        }
        return JSON.parse(data);
    }
}
