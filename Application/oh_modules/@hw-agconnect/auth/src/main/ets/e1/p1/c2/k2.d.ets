import { Chain, Interceptor } from "./b3";
import { Response } from "./a3";
import { SdkInfo } from "../m2/o2";
export declare class LoggerInterceptor implements Interceptor {
    region: string;
    sdkInfo: SdkInfo;
    constructor(region: string, sdkInfo: SdkInfo);
    intercept(chain: Chain): Promise<Response | null>;
}
