import deviceInfo from '@ohos.deviceInfo';
import display from '@ohos.display';
import bundleManager from '@ohos.bundle.bundleManager';
import { Logger } from "../f1/g1";
export class SystemUtil {
    static getPackageName(context) {
        return context.applicationInfo?.name;
    }
    static async getAppVersion() {
        let result = '';
        try {
            let bundleFlags = bundleManager.BundleFlag.GET_BUNDLE_INFO_DEFAULT;
            let bundleInfoForSelf = await bundleManager.getBundleInfoForSelf(bundleFlags);
            result = bundleInfoForSelf?.versionName;
        }
        catch (e) {
            Logger.warn('SystemUtil', 'get app version error:' + e?.message);
        }
        return Promise.resolve(result);
    }
    static getOsFullName() {
        let fullname = deviceInfo.osFullName.split('-');
        if (fullname && fullname.length >= 1) {
            return fullname[0] + ' ' + fullname[1];
        }
        return '';
    }
    static getOsName() {
        let fullname = SystemUtil.getOsFullName();
        let index = fullname.indexOf(' ');
        if (index > 0) {
            return fullname.substring(0, index);
        }
        return fullname;
    }
    static getOsFullVersion() {
        let fullname = deviceInfo.osFullName.split('-');
        if (fullname && fullname.length >= 1) {
            return fullname[1];
        }
        return '';
    }
    static getOsVersion() {
        let fullname = SystemUtil.getOsFullVersion();
        if (fullname && fullname.length >= 1) {
            let index = fullname.indexOf('(');
            if (index > 0) {
                return fullname.substring(0, index);
            }
            return fullname;
        }
        return '';
    }
    static getBrand() {
        return deviceInfo.brand;
    }
    static getProductModel() {
        return deviceInfo.productModel;
    }
    static getDisplayVersion() {
        return deviceInfo.productModel;
    }
    static async getDefaultDisplay() {
        return display.getDefaultDisplaySync();
    }
}
