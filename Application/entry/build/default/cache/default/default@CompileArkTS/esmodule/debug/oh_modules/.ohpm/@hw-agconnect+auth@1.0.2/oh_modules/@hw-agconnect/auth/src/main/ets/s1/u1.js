import authentication from "@hms:core.authentication";
import util from "@ohos:util";
import { AuthImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/a&1.0.2";
export class HwIdAuthManager {
    static async getAuthCode(forceLogin) {
        let m3 = new authentication.HuaweiIDProvider().createLoginWithHuaweiIDRequest();
        m3.forceLogin = forceLogin;
        m3.state = util.generateRandomUUID();
        return new Promise((p3, q3) => {
            try {
                let controller = new authentication.AuthenticationController(AuthImpl.getInstance().appContext);
                controller.executeRequest(m3).then((response) => {
                    let t3 = response;
                    let state = t3.state;
                    if (state !== undefined && m3.state !== state) {
                        if (forceLogin === true) {
                            q3('hwid login state error!');
                            return;
                        }
                        p3(HwIdAuthManager.getAuthCode(true));
                    }
                    let u3 = t3.data;
                    let code = u3.authorizationCode;
                    if (code) {
                        p3(code);
                    }
                    else {
                        if (forceLogin === true) {
                            q3('authCode is null');
                            return;
                        }
                        p3(HwIdAuthManager.getAuthCode(true));
                    }
                }).catch((error) => {
                    if (forceLogin === true) {
                        q3(error);
                        return;
                    }
                    p3(HwIdAuthManager.getAuthCode(true));
                });
            }
            catch (error) {
                if (forceLogin === true) {
                    q3(error);
                    return;
                }
                p3(HwIdAuthManager.getAuthCode(true));
            }
        });
    }
}
