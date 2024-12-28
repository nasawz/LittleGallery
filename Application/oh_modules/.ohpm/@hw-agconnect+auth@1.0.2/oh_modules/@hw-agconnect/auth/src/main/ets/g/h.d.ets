import { AuthBackend } from "../e/f";
import { UserRawData } from "./p4";
import { AuthDefaultUser as AuthDefaultUser } from "./o4";
import { UserStored } from "../j1/k1";
export declare class UserManager {
    storedManager: UserStored | undefined;
    authBackend: AuthBackend | undefined;
    user: AuthDefaultUser | undefined;
    makeUserInstance(a10: UserRawData): Promise<AuthDefaultUser>;
    disposeUserInstance(): Promise<void>;
    currentUserInstance(): Promise<AuthDefaultUser | null>;
}
export declare class UserManagerBuilder {
    private manager;
    constructor();
    setAuthBackend(z9: AuthBackend): UserManagerBuilder;
    setStoredManager(y9: UserStored): UserManagerBuilder;
    build(): UserManager;
    private reset;
}
