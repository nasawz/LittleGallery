import { Chain, Interceptor } from "../e1/p1/c2/b3";
import { Response } from "../e1/p1/c2/a3";
import { AuthDefaultUser } from "../g/o4";
export declare class AuthTokenInterceptor implements Interceptor {
    private user;
    constructor(user: AuthDefaultUser);
    intercept(b10: Chain): Promise<Response | null>;
}
