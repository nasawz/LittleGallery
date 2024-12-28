import { Request } from "./l2";
import { Response } from "./a3";
export interface Interceptor {
    intercept(chain: Chain): Promise<Response | null>;
}
export interface Chain {
    request(): Request;
    proceed(request: Request): Promise<Response | null>;
}
