import { Chain, Interceptor } from "./b3";
import { Response } from "./a3";
import { SdkInfo } from "../m2/o2";
export declare class ApiInterceptor implements Interceptor {
    sdkInfo: SdkInfo;
    constructor(sdkInfo: SdkInfo);
    apiInfo(): Promise<Record<string, string | number>>;
    intercept(chain: Chain): Promise<Response | null>;
}
