import { AGCAuthError } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/c/d&1.0.2";
import { Backend } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/m2/n2&1.0.2";
export class AuthBackend {
    constructor() {
    }
    async get(request, responseClass, interceptors) {
        return this.sendRequest('GET', request, responseClass, interceptors);
    }
    async post(request, responseClass, interceptors) {
        return this.sendRequest('POST', request, responseClass, interceptors);
    }
    async put(request, responseClass, interceptors) {
        return this.sendRequest('PUT', request, responseClass, interceptors);
    }
    async sendRequest(method, request, responseClass, interceptors) {
        let options = {
            clientToken: true
        };
        let response = await Backend.sendRequest(method, request, options, interceptors);
        let result = JSON.parse(response.result);
        if (result?.ret?.code === 0) {
            responseClass.constructResponse(result);
            return responseClass;
        }
        else if (result?.ret?.code !== 0) {
            let authErrorCode = {
                code: result.ret.code,
                message: result.ret.msg
            };
            return Promise.reject(new AGCAuthError(authErrorCode));
        }
        else {
            return Promise.reject(result);
        }
    }
}
