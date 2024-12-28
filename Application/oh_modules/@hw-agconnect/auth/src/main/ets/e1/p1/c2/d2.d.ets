import { Chain, Interceptor } from "./b3";
import { Response } from "./a3";
export declare class CallServerInterceptor implements Interceptor {
    intercept(chain: Chain): Promise<Response>;
}
