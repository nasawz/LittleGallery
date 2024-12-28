import auth from '@normalized:N&&&@hw-agconnect/auth/Index&1.0.2';
import { Response } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/c2/a3&1.0.2";
export class ClientTokenInterceptor {
    constructor(region) {
        this.region = region;
    }
    async intercept(chain) {
        let request = chain.request();
        try {
            let token = await auth.getToken(false, this.region);
            if (!request.header) {
                request.header = {};
            }
            request.header.Authorization = 'Bearer ' + token?.tokenString;
            return chain.proceed(request);
        }
        catch (e) {
            let resp = new Response();
            resp.responseCode = e?.code;
            resp.message = e?.msg;
            return Promise.resolve(resp);
        }
    }
}
