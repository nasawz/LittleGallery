import { Backend } from "../m2/n2";
import { AGCError } from "../../h2/i2";
import { Logger } from "../../f1/g1";
import { ClientTokenRequest } from "./r2";
import { ClientTokenStored } from "./v2";
import { CredentialInfo } from "./w2";
import { TokenImpl } from "./x2";
import JSON from "@ohos.util.json";
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
