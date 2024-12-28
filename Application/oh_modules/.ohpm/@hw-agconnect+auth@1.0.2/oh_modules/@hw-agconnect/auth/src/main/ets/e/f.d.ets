import { AuthBaseRequest } from "./i/o3";
import List from '@ohos.util.List';
import { Interceptor } from "../e1/p1/c2/b3";
import { BaseResponse } from "../e1/p1/m2/q2";
import { Method } from "../e1/p1/m2/n2";
export declare class AuthBackend {
    constructor();
    get(request: AuthBaseRequest, responseClass: BaseResponse, interceptors?: List<Interceptor>): Promise<BaseResponse>;
    post(request: AuthBaseRequest, responseClass: BaseResponse, interceptors?: List<Interceptor>): Promise<BaseResponse>;
    put(request: AuthBaseRequest, responseClass: BaseResponse, interceptors?: List<Interceptor>): Promise<BaseResponse>;
    sendRequest(method: Method, request: AuthBaseRequest, responseClass: BaseResponse, interceptors?: List<Interceptor>): Promise<BaseResponse>;
}
