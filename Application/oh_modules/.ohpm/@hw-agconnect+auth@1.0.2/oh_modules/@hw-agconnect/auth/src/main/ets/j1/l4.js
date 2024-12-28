import e7 from '@ohos.data.preferences';
export class Preferences {
    static async get(context, fileName, key) {
        let preferences = await e7.getPreferences(context, fileName);
        let value = await preferences.get(key, '');
        return Promise.resolve(value);
    }
    static async put(context, fileName, key, value) {
        let preferences = await e7.getPreferences(context, fileName);
        await preferences.put(key, value);
        await preferences.flush();
        return Promise.resolve();
    }
    static async delete(context, fileName, key) {
        let preferences = await e7.getPreferences(context, fileName);
        await preferences.delete(key);
        await preferences.flush();
        return Promise.resolve();
    }
}
