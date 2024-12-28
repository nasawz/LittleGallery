import { GRS_TYPE } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/b&1.0.2";
import { AuthImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/a&1.0.2";
export class ClientTokenRequest {
    constructor(region) {
        this.interfaceId = '/agc/apigw/oauth2/v1/token';
        this.region_ = region ? region : AuthImpl.getInstance().getRegion();
    }
    sdkInfo() {
        return {
            sdkServiceName: 'agconnect-credential',
            sdkVersion: ''
        };
    }
    region() {
        return this.region_;
    }
    url() {
        return {
            main: 'https://' + AuthImpl.getInstance().getGrsConfig(GRS_TYPE.AGC_GW, this.region_) + this.interfaceId,
            back: 'https://' + AuthImpl.getInstance().getGrsConfig(GRS_TYPE.AGC_GW_BACK, this.region_) + this.interfaceId
        };
    }
    async header() {
        return {};
    }
    async body() {
        return {
            'grant_type': 'client_credentials',
            'client_id': AuthImpl.getInstance().getClientId(),
            'client_secret': await AuthImpl.getInstance().getClientSecret(),
            'useJwt': 1
        };
    }
}
