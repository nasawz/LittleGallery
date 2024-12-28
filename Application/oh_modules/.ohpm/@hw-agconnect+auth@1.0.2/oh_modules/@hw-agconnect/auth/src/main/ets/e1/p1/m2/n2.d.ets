import List from '@ohos.util.List';
import { Interceptor } from "../c2/b3";
import { BaseRequest } from "./o2";
export declare class Backend {
    static post(request: BaseRequest, options?: HttpOptions, interceptors?: List<Interceptor>): Promise<object>;
    static sendRequest(method: Method, baseRequest: BaseRequest, options?: HttpOptions, interceptors?: List<Interceptor>): Promise<object>;
}
export interface HttpOptions {
    clientToken?: boolean;
    readTimeout?: number;
    connectTimeout?: number;
}
export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
