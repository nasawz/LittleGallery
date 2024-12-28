import { AuthDefaultUser as AuthDefaultUser } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/g/o4&1.0.2";
export class UserManager {
    async makeUserInstance(a10) {
        await this.disposeUserInstance();
        this.user = AuthDefaultUser.fromRawData(a10);
        this.user.setStoreManager(this.storedManager);
        this.user.setAuthBackend(this.authBackend);
        await this.user.syncToStorage();
        return this.user;
    }
    async disposeUserInstance() {
        await this.currentUserInstance();
        if (this.user) {
            await this.user.dispose();
            this.user = undefined;
        }
    }
    async currentUserInstance() {
        if (this.user) {
            return this.user;
        }
        let data = await this.storedManager.getLocalUser();
        if (data == null) {
            return null;
        }
        this.user = AuthDefaultUser.fromRawData(data);
        this.user.setStoreManager(this.storedManager);
        this.user.setAuthBackend(this.authBackend);
        return this.user;
    }
}
export class UserManagerBuilder {
    constructor() {
        this.reset();
    }
    setAuthBackend(z9) {
        this.manager.authBackend = z9;
        return this;
    }
    setStoredManager(y9) {
        this.manager.storedManager = y9;
        return this;
    }
    build() {
        let x9 = this.manager;
        this.reset();
        return x9;
    }
    reset() {
        this.manager = new UserManager();
    }
}
