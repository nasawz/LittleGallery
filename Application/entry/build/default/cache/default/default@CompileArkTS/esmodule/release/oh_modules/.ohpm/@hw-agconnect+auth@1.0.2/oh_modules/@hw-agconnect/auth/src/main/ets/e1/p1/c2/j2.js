import { SystemUtil } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/y2/z2&1.0.2";
import { AuthImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/a&1.0.2";
export class ApiInterceptor {
    constructor(sdkInfo) {
        this.sdkInfo = sdkInfo;
    }
    async apiInfo() {
        return {
            'sdkVersion': this.sdkInfo?.sdkVersion,
            'sdkServiceName': this.sdkInfo?.sdkServiceName,
            'sdkPlatform': 'OpenHarmony',
            'sdkType': 'TS',
            'sdkPlatformVersion': SystemUtil.getOsVersion(),
            'packageName': SystemUtil.getPackageName(AuthImpl.getInstance().appContext),
            'appVersion': await SystemUtil.getAppVersion(),
            'appId': AuthImpl.getInstance().getAppId(),
            'client_id': AuthImpl.getInstance().getClientId(),
            'productId': AuthImpl.getInstance().getProductId(),
            'Content-Type': 'application/json;charset=UTF-8'
        };
    }
    async intercept(chain) {
        let request = chain.request();
        let apiInfo = await this.apiInfo();
        if (!request.header) {
            request.header = {};
        }
        for (let ele of Object.entries(apiInfo)) {
            let key = ele[0];
            if (!request.header[key]) {
                request.header[key] = apiInfo[key];
            }
        }
        return chain.proceed(request);
    }
}
