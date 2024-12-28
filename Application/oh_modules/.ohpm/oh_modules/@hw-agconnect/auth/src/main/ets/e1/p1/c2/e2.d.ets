import List from '@ohos.util.List';
import { Chain, Interceptor } from "./b3";
import { Request } from "./l2";
import { Response } from "./a3";
export declare class RealInterceptorChain implements Chain {
    interceptors: List<Interceptor>;
    request_: Request;
    index: number;
    constructor(interceptors: List<Interceptor>, index: number, request: Request);
    request(): Request;
    proceed(request: Request): Promise<Response | null>;
}
