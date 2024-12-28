import { Logger } from "../../f1/g1";
const TAG = 'HTTP';
export class LoggerInterceptor {
    constructor(region, sdkInfo) {
        this.region = region;
        this.sdkInfo = sdkInfo;
    }
    async intercept(chain) {
        let request = chain.request();
        let msg = `${request.method}, region:${this.region},interface:${maskUrl(request.url)} serviceInfo:${this.sdkInfo.sdkServiceName}/${this.sdkInfo.sdkVersion}`;
        Logger.info(TAG, `--->${msg}`);
        let time = new Date().getTime();
        let response = await chain.proceed(request);
        Logger.info(TAG, `<---${msg} responseCode:${response.responseCode}, responseMsg:${response.message}, constTime:${new Date().getTime() - time}`);
        return response;
    }
}
function maskUrl(url) {
    if (url) {
        let strArray = url.split('.');
        if (strArray && strArray.length > 0) {
            let re = /\//g;
            let result = strArray[strArray.length - 1].replace(re, '');
            return result;
        }
    }
    return '';
}
