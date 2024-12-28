export class AuthTokenInterceptor {
    constructor(user) {
        this.user = user;
    }
    async intercept(b10) {
        let request = b10.request();
        try {
            if (!request.header) {
                request.header = {};
            }
            let token = await this.user.getToken(false);
            request.header.access_token = token?.getString();
            return b10.proceed(request);
        }
        catch (e) {
            let c10 = {
                responseCode: e?.code,
                message: e?.message
            };
            return Promise.resolve(c10);
        }
    }
}
