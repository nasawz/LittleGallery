import { AGCAuthError, GRS_TYPE, } from "./b";
import List from '@ohos.util.List';
import { AuthBackend } from "./e/f";
import { UserManagerBuilder } from "./g/h";
import { VerifyCodeRequest } from "./e/i/j";
import { PhoneUtil } from "./k/l";
import { VerifyCodeResponse } from "./e/m/n";
import { VerifyCodeResultImpl } from "./o/p";
import { RegisterUserRequest } from "./e/i/q";
import { AGConnectAuthCredentialProvider } from "./r";
import { SignInResponse } from "./e/m/s";
import { SignInResultImpl } from "./o/t";
import { ResetPasswordRequest } from "./e/i/u";
import { ResetPasswordResponse } from "./e/m/v";
import { SignInRequest } from "./e/i/w";
import { PhoneAuthProvider } from "./x/y";
import { EmailAuthProvider } from "./x/z";
import { SignInAnonymousRequest } from "./e/i/a1";
import { SignInAnonymousResponse } from "./e/m/b1";
import { DeleteUserRequest } from "./e/i/c1";
import { DeleteUserResponse } from "./e/m/d1";
import { Logger } from "./e1/f1/g1";
import { SignOutRequest } from "./e/i/h1";
import { SignOutResponse } from "./e/m/i1";
import { UserStored } from "./j1/k1";
import { AGCAuthErrorCode } from "./c/l1";
import { DecryptExclamationMark } from "./e1/m1/n1";
import { replace } from "./e1/m1/o1";
import Credential from "./e1/p1/q1/r1";
import { HwIdAuthProvider } from "./s1/x/t1";
import { HwIdAuthManager } from "./s1/u1";
import { CloudCommonAuthProvider } from "./g/v1";
const TAG = 'AuthImpl';
export class AuthImpl {
    static getInstance() {
        if (!AuthImpl.instance) {
            AuthImpl.instance = new AuthImpl();
        }
        return AuthImpl.instance;
    }
    static getAuthInstance() {
        return AuthImpl.getInstance();
    }
    getAuthProvider() {
        return new CloudCommonAuthProvider();
    }
    async requestVerifyCode(verifyCodeParam) {
        let requestMaker = {
            'phone': () => {
                let phoneVerifyCode = verifyCodeParam.verifyCodeType;
                let req = new VerifyCodeRequest();
                req.setPhone(PhoneUtil.combinatePhone(phoneVerifyCode.countryCode, phoneVerifyCode.phoneNumber));
                return req;
            },
            'email': () => {
                let emailVerifyCode = verifyCodeParam.verifyCodeType;
                let req = new VerifyCodeRequest();
                req.setEmail(emailVerifyCode.email);
                return req;
            }
        };
        let req = requestMaker[verifyCodeParam.verifyCodeType.kind]();
        req.setAction(verifyCodeParam.action);
        req.setLang(verifyCodeParam.lang);
        req.setSendInterval(verifyCodeParam.sendInterval ? verifyCodeParam.sendInterval : 0);
        let verifyCodeResponse = await this.authBackend.post(req, new VerifyCodeResponse());
        return new VerifyCodeResultImpl(verifyCodeResponse.shortestInterval, verifyCodeResponse.validityPeriod);
    }
    async createUser(credentialInfo) {
        let requestMaker = {
            'phone': () => {
                let phoneInfo = credentialInfo;
                let req = new RegisterUserRequest();
                req.phone = PhoneUtil.combinatePhone(phoneInfo.countryCode, phoneInfo.phoneNumber);
                req.password = phoneInfo.password;
                req.verifyCode = phoneInfo.verifyCode;
                req.provider = AGConnectAuthCredentialProvider.Phone_Provider;
                return req;
            },
            'email': () => {
                let emailInfo = credentialInfo;
                let req = new RegisterUserRequest();
                req.email = emailInfo.email;
                req.password = emailInfo.password;
                req.verifyCode = emailInfo.verifyCode;
                req.provider = AGConnectAuthCredentialProvider.Email_Provider;
                return req;
            }
        };
        let request = requestMaker[credentialInfo.kind]();
        let signInResponse = await this.authBackend.post(request, new SignInResponse());
        let user = await this.userManager.makeUserInstance(this.convertToUserInfo(signInResponse));
        return new SignInResultImpl(user);
    }
    async resetPassword(credentialInfo) {
        let requestMaker = {
            'phone': () => {
                let req = new ResetPasswordRequest();
                let phoneInfo = credentialInfo;
                req.account = PhoneUtil.combinatePhone(phoneInfo.countryCode, phoneInfo.phoneNumber);
                req.newPassword = phoneInfo.password;
                req.verifyCode = phoneInfo.verifyCode;
                req.provider = AGConnectAuthCredentialProvider.Phone_Provider;
                return req;
            },
            'email': () => {
                let req = new ResetPasswordRequest();
                let emailInfo = credentialInfo;
                req.account = emailInfo.email;
                req.newPassword = emailInfo.password;
                req.verifyCode = emailInfo.verifyCode;
                req.provider = AGConnectAuthCredentialProvider.Email_Provider;
                return req;
            }
        };
        let request = requestMaker[credentialInfo.kind]();
        await this.authBackend.post(request, new ResetPasswordResponse());
        return Promise.resolve();
    }
    async signIn(param) {
        let signInParam = { 'autoCreateUser': true, 'credentialInfo': param.credentialInfo };
        let user = await this.userManager.currentUserInstance();
        if (user) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.ALREADY_SIGN_IN_USER));
        }
        let credentialInfo = signInParam.credentialInfo;
        if (!credentialInfo) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.CREDENTIAL_INVALID));
        }
        let requestMaker = {
            'phone': () => {
                let req = new SignInRequest();
                let phoneCredentialInfo = credentialInfo;
                let credential = PhoneAuthProvider.credentialWithPasswordAndVerifyCode(phoneCredentialInfo.countryCode, phoneCredentialInfo.phoneNumber, phoneCredentialInfo.password, phoneCredentialInfo.verifyCode);
                credential.prepareUserAuthRequest(req);
                req.setAutoCreateUser(signInParam.autoCreateUser);
                return req;
            },
            'email': () => {
                let req = new SignInRequest();
                let emailInfo = credentialInfo;
                let credential = EmailAuthProvider.credentialWithPasswordAndVerifyCode(emailInfo.email, emailInfo.password, emailInfo.verifyCode);
                credential.prepareUserAuthRequest(req);
                req.setAutoCreateUser(signInParam.autoCreateUser);
                return req;
            },
            'hwid': async () => {
                let req = new SignInRequest();
                let authCode = await HwIdAuthManager.getAuthCode(false);
                let credential = HwIdAuthProvider.credentialWithToken(authCode);
                credential.prepareUserAuthRequest(req);
                req.setAutoCreateUser(signInParam.autoCreateUser);
                return req;
            }
        };
        let request = await requestMaker[signInParam.credentialInfo.kind]();
        let signInResponse = await this.authBackend.post(request, new SignInResponse());
        let newUser = await this.userManager.makeUserInstance(this.convertToUserInfo(signInResponse));
        return new SignInResultImpl(newUser);
    }
    async signInAnonymously() {
        let user = await this.userManager.currentUserInstance();
        if (user) {
            if (user.isAnonymous()) {
                return new SignInResultImpl(user);
            }
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.ALREADY_SIGN_IN_USER));
        }
        let request = new SignInAnonymousRequest();
        let signInAnonymousResponse = await this.authBackend?.post(request, new SignInAnonymousResponse());
        let newUser = await this.userManager.makeUserInstance(this.convertToUserInfo(signInAnonymousResponse, true));
        return new SignInResultImpl(newUser);
    }
    async deleteUser() {
        let user = await this.userManager.currentUserInstance();
        if (!user) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.NOT_SIGN_IN));
        }
        let deleteUserRequest = new DeleteUserRequest();
        let icList = new List();
        icList.add(user.createTokenInterceptor());
        await this.authBackend.post(deleteUserRequest, new DeleteUserResponse(), icList);
        await this.userManager.disposeUserInstance();
        return Promise.resolve();
    }
    async signOut() {
        let user = await this.userManager.currentUserInstance();
        if (!user) {
            Logger.info(TAG, 'no user login in');
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.NOT_SIGN_IN));
        }
        let signOutRequest = new SignOutRequest();
        signOutRequest.bodyAccessToken = user.getAccessToken();
        signOutRequest.refreshToken = user.getRefreshToken();
        try {
            await this.authBackend.post(signOutRequest, new SignOutResponse());
        }
        catch (e) {
            Logger.info(TAG, `logout error ${JSON.stringify(e)}`);
        }
        await this.userManager.disposeUserInstance();
        return Promise.resolve();
    }
    async getCurrentUser() {
        let user = await this.userManager.currentUserInstance();
        return user;
    }
    init(applicationContext, json) {
        this.appContext = applicationContext;
        let packageName = applicationContext.applicationInfo.name;
        let jsonObject = JSON.parse(json);
        let config = replace(packageName, jsonObject);
        this.json = config;
        this.authBackend = new AuthBackend();
        this.userManager = new UserManagerBuilder()
            .setAuthBackend(this.authBackend)
            .setStoredManager(new UserStored(this.getRegion()))
            .build();
    }
    async setRegion(region) {
        let user = await this.userManager.currentUserInstance();
        if (user) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.ALREADY_SIGN_IN_USER));
        }
        if (this.getRegion() !== region) {
            this.region = region;
            this.userManager = new UserManagerBuilder()
                .setAuthBackend(this.authBackend)
                .setStoredManager(new UserStored(this.getRegion()))
                .build();
        }
        return Promise.resolve();
    }
    getGrsConfig(type, region) {
        if (!region) {
            region = this.getRegion();
        }
        switch (type) {
            case GRS_TYPE.AGC_GW:
                return this.getString(`/agcgw_all/${region}`);
            case GRS_TYPE.AGC_GW_BACK:
                return this.getString(`/agcgw_all/${region}_back`);
            case GRS_TYPE.WEBSOCKET_GW:
                return this.getString(`/websocketgw_all/${region}`);
            case GRS_TYPE.WEBSOCKET_GW_BACK:
                return this.getString(`/websocketgw_all/${region}_back`);
            case GRS_TYPE.STORAGE_GW:
                return this.getString(`/service/cloudstorage/storage_url_${region.toLowerCase()}`);
            case GRS_TYPE.STORAGE_GW_BACK:
                return this.getString(`/service/cloudstorage/storage_url_${region.toLowerCase()}_back`);
            default:
                return this.getString(`agcgw/url`);
        }
    }
    getProductId() {
        let productId = this.getString('/client/product_id');
        return productId ? productId : '';
    }
    getAppId() {
        let appId = this.getString('/client/app_id');
        return appId ? appId : '';
    }
    getClientId() {
        if (this.clientId) {
            return this.clientId;
        }
        this.clientId = this.getString('/client/client_id');
        return this.clientId ? this.clientId : '';
    }
    setClientSecret(clientSecret) {
        this.clientSecret = clientSecret;
    }
    setClientId(clientId) {
        this.clientId = clientId;
    }
    async getClientSecret() {
        if (this.clientSecret) {
            return this.clientSecret;
        }
        this.clientSecret = await this.getDecryptString('/client/client_secret');
        return this.clientSecret;
    }
    async getToken(refresh, region) {
        if (!refresh) {
            refresh = false;
        }
        if (!region) {
            region = this.getDefaultRegion();
        }
        return Credential.getToken(refresh, region);
    }
    getRegion() {
        if (this.region) {
            return this.region;
        }
        return this.getDefaultRegion();
    }
    convertToUserInfo(response, isAnonymous = false) {
        if (isAnonymous) {
            let rsp = response;
            return {
                anonymous: true,
                uid: rsp.getUserInfo().getUid(),
                providerId: AGConnectAuthCredentialProvider.Anonymous.toString(),
                accessToken: rsp.getAccessToken().getToken(),
                accessTokenValidPeriod: rsp.getAccessToken().getValidPeriod(),
                refreshToken: rsp.getRefreshToken().getToken(),
                startTime: new Date().getTime()
            };
        }
        let rsp = response;
        return {
            anonymous: false,
            uid: rsp.getUserInfo().getUid(),
            displayName: rsp.getUserInfo().getDisplayName(),
            photoUrl: rsp.getUserInfo().getPhotoUrl(),
            email: rsp.getUserInfo().getEmail(),
            emailVerified: rsp.getUserInfo().getEmailVerified(),
            passwordSetted: rsp.getUserInfo().getPasswordSetted(),
            phone: rsp.getUserInfo().getPhone(),
            providerId: rsp.getUserInfo().getProvider().toString(),
            accessToken: rsp.getAccessToken().getToken(),
            accessTokenValidPeriod: rsp.getAccessToken().getValidPeriod(),
            refreshToken: rsp.getRefreshToken().getToken(),
            providerInfo: rsp.getProviders(),
            startTime: new Date().getTime()
        };
    }
    getDefaultRegion() {
        return this.getString('region');
    }
    getString(path) {
        if (path.startsWith('/')) {
            path = path.substring(1);
        }
        if (path.endsWith('/')) {
            path = path.substring(0, path.length - 1);
        }
        let array = path.split('/');
        let value = this.json;
        if (value) {
            for (let key = 0; key < array.length; key++) {
                value = value[array[key]];
            }
            return value;
        }
        return '';
    }
    async getDecryptString(path) {
        let originalValue = this.getString(path);
        if (DecryptExclamationMark.isMatch(originalValue)) {
            if (!this.decryptMark) {
                this.decryptMark = new DecryptExclamationMark(this.json['code']['code1'], this.json['code']['code2'], this.json['code']['code3'], this.json['code']['code4']);
            }
            let decrypt = await this.decryptMark.decrypt(originalValue);
            if (decrypt) {
                return decrypt;
            }
        }
        return originalValue;
    }
}
export default AuthImpl.getAuthInstance();
