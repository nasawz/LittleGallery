import auth from '../../../../../../Index';
import { Response } from "./a3";
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
