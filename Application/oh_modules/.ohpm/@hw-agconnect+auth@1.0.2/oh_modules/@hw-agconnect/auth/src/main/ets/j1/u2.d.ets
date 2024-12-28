export declare class StoredManager {
    private DEFAULT_FILE_NAME;
    private name;
    private region;
    private huskManager;
    private keyAlias;
    constructor(name: string, region: string, keyAlias?: string);
    saveToPfStorage(m7: string | null): Promise<void>;
    loadFromPfStorage(): Promise<string | null>;
    deletePfData(): Promise<void>;
    saveToFileStorage(j7: string | null): Promise<void>;
    loadFromFileStorage(): Promise<string | null>;
    deleteFileData(): Promise<void>;
}
