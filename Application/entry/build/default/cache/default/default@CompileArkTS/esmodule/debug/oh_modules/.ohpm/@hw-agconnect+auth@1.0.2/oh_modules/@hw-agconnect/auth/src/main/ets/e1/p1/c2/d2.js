import { Response } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/a3&1.0.2";
import http from "@ohos:net.http";
export class CallServerInterceptor {
    async intercept(chain) {
        let request = chain.request();
        let connectTimeout = request.connectTimeout ? request.connectTimeout : 60000;
        let readTimeout = request.readTimeout ? request.readTimeout : 60000;
        let httpRequest = http.createHttp();
        let ohosOptions = {
            method: request.method,
            header: request.header,
            extraData: request.body,
            connectTimeout: connectTimeout,
            readTimeout: readTimeout
        };
        return new Promise((resolve) => {
            let res = new Response();
            httpRequest.request(request.url, ohosOptions).then((resp) => {
                res.responseCode = resp.responseCode;
                res.result = resp.result;
                resolve(res);
                httpRequest.destroy();
            }).catch((err) => {
                res.responseCode = err.code;
                res.message = err.message;
                resolve(res);
                httpRequest.destroy();
            });
        });
    }
}
