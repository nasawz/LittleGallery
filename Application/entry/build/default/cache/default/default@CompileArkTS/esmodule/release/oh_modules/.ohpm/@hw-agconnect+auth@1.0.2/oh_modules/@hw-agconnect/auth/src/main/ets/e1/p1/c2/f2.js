import { Logger } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/f1/g1&1.0.2";
export class BackupInterceptor {
    constructor(mainUrl, backUrl) {
        this.mainUrl = mainUrl;
        this.backUrl = backUrl;
    }
    async intercept(chain) {
        let request = chain.request();
        let resp = await chain.proceed(request);
        if (request.url === this.mainUrl && this.mainUrl !== this.backUrl) {
            if (resp && resp?.responseCode === 2300006) {
                Logger.warn('BackupInterceptor', 'use backup url.');
                request.url = this.backUrl;
                return chain.proceed(request);
            }
        }
        return resp;
    }
}
