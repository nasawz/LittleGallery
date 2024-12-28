import List from '@ohos:util.List';
export class RealInterceptorChain {
    constructor(interceptors, index, request) {
        this.interceptors = new List();
        this.interceptors = interceptors;
        this.index = index;
        this.request_ = request;
    }
    request() {
        return this.request_;
    }
    async proceed(request) {
        if (this.index >= this.interceptors.length) {
            return null;
        }
        let next = new RealInterceptorChain(this.interceptors, this.index + 1, request);
        let interceptor = this.interceptors.get(this.index);
        return interceptor.intercept(next);
    }
}
