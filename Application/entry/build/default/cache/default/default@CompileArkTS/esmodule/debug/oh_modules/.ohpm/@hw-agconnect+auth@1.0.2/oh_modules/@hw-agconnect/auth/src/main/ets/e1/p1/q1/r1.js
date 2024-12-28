import { Backend } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/m2/n2&1.0.2";
import { AGCError } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/h2/i2&1.0.2";
import { Logger } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/f1/g1&1.0.2";
import { ClientTokenRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/q1/r2&1.0.2";
import { ClientTokenStored } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/q1/v2&1.0.2";
import { CredentialInfo } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/q1/w2&1.0.2";
import { TokenImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/p1/q1/x2&1.0.2";
import JSON from "@ohos:util.json";
const TAG = 'Credential';
class Credential {
    async getToken(forceRefresh, region) {
        if (!this.clientTokenStorage) {
            this.clientTokenStorage = new ClientTokenStored();
        }
        let data = await this.clientTokenStorage.getLocalClientToken();
        let credentialInfo;
        if (data != null) {
            let info = data;
            credentialInfo = new CredentialInfo(info.expiration, info.tokenString, info.lastRefreshTime);
            if (credentialInfo != null && credentialInfo.isValid()) {
                if (forceRefresh && credentialInfo.allowRefresh()) {
                    Logger.info(TAG, 'force Refresh client token');
                }
                else {
                    Logger.info(TAG, 'get client token from local');
                    return Promise.resolve(new TokenImpl(credentialInfo.expiration, credentialInfo.tokenString));
                }
            }
        }
        let response = await Backend.post(new ClientTokenRequest(region));
        let result = JSON.parse(response.result);
        if (response.responseCode !== 200) {
            Logger.error(TAG, 'get client token error');
            return Promise.reject(new AGCError(response.responseCode, response.message));
        }
        else {
            Logger.info(TAG, 'update client token');
            credentialInfo = new CredentialInfo(result.expires_in, result.access_token, new Date().getTime());
            await this.clientTokenStorage.saveClientToken(JSON.stringify(credentialInfo));
            return Promise.resolve(new TokenImpl(credentialInfo.expiration, credentialInfo.tokenString));
        }
    }
}
export default new Credential();
