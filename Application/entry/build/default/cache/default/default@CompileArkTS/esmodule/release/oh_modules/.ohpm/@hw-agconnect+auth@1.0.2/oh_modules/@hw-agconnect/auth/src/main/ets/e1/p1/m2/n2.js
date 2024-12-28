import List from '@ohos:util.List';
import { CallServerInterceptor } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/d2&1.0.2";
import { RealInterceptorChain } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/e2&1.0.2";
import { BackupInterceptor } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/f2&1.0.2";
import { ClientTokenInterceptor } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/g2&1.0.2";
import { AGCError } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/h2/i2&1.0.2";
import { ApiInterceptor } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/j2&1.0.2";
import { LoggerInterceptor } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/k2&1.0.2";
import { Request } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/l2&1.0.2";
export class Backend {
    static async post(request, options, interceptors) {
        return Backend.sendRequest('POST', request, options, interceptors);
    }
    static async sendRequest(method, baseRequest, options, interceptors) {
        let list = new List();
        if (interceptors && interceptors.length > 0) {
            list = interceptors;
        }
        list.add(new LoggerInterceptor(baseRequest.region(), baseRequest.sdkInfo()));
        if (baseRequest.url().back) {
            list.add(new BackupInterceptor(baseRequest.url().main, baseRequest.url().back));
        }
        if (options && options.clientToken) {
            list.add(new ClientTokenInterceptor(baseRequest.region()));
        }
        list.add(new ApiInterceptor(baseRequest.sdkInfo()));
        list.add(new CallServerInterceptor());
        let request_ = new Request();
        request_.url = baseRequest.url().main;
        request_.method = method;
        request_.header = await baseRequest.header();
        request_.body = await baseRequest.body();
        request_.readTimeout = options?.readTimeout;
        request_.connectTimeout = options?.connectTimeout;
        let realInterceptorChain = new RealInterceptorChain(list, 0, request_);
        let response = await realInterceptorChain.proceed(request_);
        if (response && response.responseCode === 200) {
            return Promise.resolve(response);
        }
        else {
            let message = response?.message;
            if (!message) {
                message = response?.result?.toString();
            }
            return Promise.reject(new AGCError(response?.responseCode, message));
        }
    }
}
