import { Chain, Interceptor } from "./b3";
import { Response } from "./a3";
export declare class BackupInterceptor implements Interceptor {
    mainUrl: string;
    backUrl: string;
    constructor(mainUrl: string, backUrl: string);
    intercept(chain: Chain): Promise<Response | null>;
}
