import { AuthImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/a&1.0.2";
import { HuksManager } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/j1/t2&1.0.2";
import { StoredManager } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/j1/u2&1.0.2";
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
