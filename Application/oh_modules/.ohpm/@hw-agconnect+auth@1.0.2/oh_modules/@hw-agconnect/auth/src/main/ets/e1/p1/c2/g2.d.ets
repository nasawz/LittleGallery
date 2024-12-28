import { Chain, Interceptor } from "./b3";
import { Response } from "./a3";
export declare class ClientTokenInterceptor implements Interceptor {
    region: string;
    constructor(region: string);
    intercept(chain: Chain): Promise<Response | null>;
}
