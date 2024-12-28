import { AuthImpl } from "../../a";
import { GRS_TYPE } from "../../b";
export class AuthBaseRequest {
    constructor(region) {
        this.accessToken = '';
        this.URL_PATH_PREFIX = '/agc/apigw/oauth2/third/v1';
        this.URL_PATH_SURFFIX = '';
        this.region_ = region ? region : AuthImpl.getInstance().getRegion();
    }
    region() {
        return this.region_;
    }
    sdkInfo() {
        return {
            sdkServiceName: 'agconnect-auth',
            sdkVersion: '1.0.2'
        };
    }
    url() {
        return {
            main: 'https://' +
                AuthImpl.getInstance().getGrsConfig(GRS_TYPE.AGC_GW, this.region_) +
                this.URL_PATH_PREFIX +
                this.URL_PATH_SURFFIX +
                this.queryParam(),
            back: 'https://' +
                AuthImpl.getInstance().getGrsConfig(GRS_TYPE.AGC_GW_BACK, this.region_) +
                this.URL_PATH_PREFIX +
                this.URL_PATH_SURFFIX +
                this.queryParam()
        };
    }
    async header() {
        return {};
    }
    async body() {
        return {};
    }
    queryParam() {
        let query = '';
        query = '?productId=' + AuthImpl.getInstance().getProductId();
        return query;
    }
}
