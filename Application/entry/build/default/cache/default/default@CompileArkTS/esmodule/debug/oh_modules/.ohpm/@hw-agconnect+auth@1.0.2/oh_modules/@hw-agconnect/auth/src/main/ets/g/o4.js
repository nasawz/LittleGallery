import { UserExtraRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/x3&1.0.2";
import { UserExtraResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/h4&1.0.2";
import { PhoneUtil } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/k/l&1.0.2";
import { UpdatePasswordResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/e4&1.0.2";
import { UpdatePasswordRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/u3&1.0.2";
import { UpdatePhoneRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/v3&1.0.2";
import { UpdatePhoneResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/f4&1.0.2";
import { UpdateEmailRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/t3&1.0.2";
import { UpdateEmailResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/d4&1.0.2";
import { SignInResultImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/t&1.0.2";
import { UserLinkRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/y3&1.0.2";
import { ReauthenticateResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/a4&1.0.2";
import { ReauthenticateRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/p3&1.0.2";
import { UpdateProfileRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/w3&1.0.2";
import { UpdateProfileResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/g4&1.0.2";
import { UserLinkResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/i4&1.0.2";
import { UserUnlinkRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/z3&1.0.2";
import { UserUnlinkResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/j4&1.0.2";
import { PhoneAuthProvider } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/x/y&1.0.2";
import { EmailAuthProvider } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/x/z&1.0.2";
import { AuthBackend } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/f&1.0.2";
import { TokenImpl } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/o/x2&1.0.2";
import { RefreshTokenResponse } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/m/b4&1.0.2";
import { RefreshTokenRequest } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e/i/q3&1.0.2";
import { AGConnectAuthCredentialProvider } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/r&1.0.2";
import { AuthTokenInterceptor } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/k/n4&1.0.2";
import List from '@ohos:util.List';
import { AGCAuthError } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/c/d&1.0.2";
import { AGCAuthErrorCode } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/c/l1&1.0.2";
import { Logger } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/f1/g1&1.0.2";
import { HwIdAuthProvider } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/s1/x/t1&1.0.2";
import { HwIdAuthManager } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/s1/u1&1.0.2";
const TAG = 'AGConnectDefaultUser';
export class AuthDefaultUser {
    constructor() {
        this.anonymous = false;
        this.uid = '';
        this.displayName = '';
        this.photoUrl = '';
        this.email = '';
        this.phone = '';
        this.providerId = '';
        this.emailVerified = 0;
        this.passwordSetted = 0;
        this.providerService = new r7();
        this.tokenService = new q7();
    }
    static fromRawData(info) {
        let user = new AuthDefaultUser();
        user.anonymous = info.anonymous;
        user.uid = info.uid;
        user.displayName = info.displayName;
        user.photoUrl = info.photoUrl;
        user.email = info.email;
        user.phone = info.phone;
        user.providerId = info.providerId;
        user.emailVerified = info.emailVerified;
        user.passwordSetted = info.passwordSetted;
        user.providerService.providerInfo = info.providerInfo;
        user.tokenService.accessToken = info.accessToken;
        user.tokenService.accessTokenValidPeriod = info.accessTokenValidPeriod;
        user.tokenService.refreshToken = info.refreshToken;
        user.tokenService.startTime = info.startTime;
        return user;
    }
    setStoreManager(v9) {
        this.storeManager = v9;
    }
    setAuthBackend(u9) {
        this.authBackend = u9;
    }
    toRawData() {
        let info = {
            anonymous: this.anonymous,
            uid: this.uid,
            displayName: this.displayName,
            photoUrl: this.photoUrl,
            email: this.email,
            phone: this.phone,
            providerId: this.providerId,
            emailVerified: this.emailVerified,
            passwordSetted: this.passwordSetted,
            providerInfo: this.providerService.providerInfo,
            accessToken: this.tokenService.accessToken,
            accessTokenValidPeriod: this.tokenService.accessTokenValidPeriod,
            refreshToken: this.tokenService.refreshToken,
            startTime: this.tokenService.startTime
        };
        return info;
    }
    getUid() {
        return this.uid;
    }
    getEmail() {
        return this.email;
    }
    getPhone() {
        return this.phone;
    }
    getDisplayName() {
        return this.displayName;
    }
    getPhotoUrl() {
        return this.photoUrl;
    }
    getProviderId() {
        return this.providerId;
    }
    isAnonymous() {
        return this.anonymous;
    }
    getProviderInfo() {
        let p9 = [];
        for (let q9 = 0; q9 < this.providerService.providerInfo?.length; q9++) {
            let r9 = new Map();
            let s9 = Object.keys(this.providerService.providerInfo[q9]);
            for (let t9 = 0; s9 && t9 < s9.length; t9++) {
                r9.set(s9[t9], this.providerService.providerInfo[q9][s9[t9]]);
            }
            p9.push(r9);
        }
        return p9;
    }
    async getToken(o9) {
        if (!o9 && this.tokenService.j()) {
            return Promise.resolve(this.tokenService.m());
        }
        await this.tokenService.o();
        await this.syncToStorage();
        return Promise.resolve(this.tokenService.m());
    }
    async getUserExtra() {
        let l9 = new UserExtraRequest();
        let m9 = new List();
        m9.add(this.createTokenInterceptor());
        let n9 = await this.authBackend.get(l9, new UserExtraResponse(), m9);
        this.displayName = n9.displayName;
        this.photoUrl = n9.photoUrl;
        this.emailVerified = n9.emailVerified;
        this.passwordSetted = n9.passwordSetted;
        this.email = n9.email;
        this.phone = n9.phone;
        await this.syncToStorage();
        return Promise.resolve(n9.userExtra);
    }
    getAccessToken() {
        return this.tokenService.getAccessToken();
    }
    getRefreshToken() {
        return this.tokenService.getRefreshToken();
    }
    getEmailVerified() {
        return this.emailVerified === 1;
    }
    getPasswordSetted() {
        return this.passwordSetted === 1;
    }
    async updateProfile(userProfile) {
        if (!userProfile.displayName || !userProfile.photoUrl) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.FAIL_TO_UPDATE_PROFILE));
        }
        let j9 = new UpdateProfileRequest();
        j9.setDisplayName(userProfile.displayName);
        j9.setPhotoUrl(userProfile.photoUrl);
        let k9 = new List();
        k9.add(this.createTokenInterceptor());
        await this.authBackend.put(j9, new UpdateProfileResponse(), k9);
        this.displayName = userProfile.displayName;
        this.photoUrl = userProfile.photoUrl;
        await this.syncToStorage();
        return Promise.resolve();
    }
    async userReauthenticate(param) {
        let d9 = { 'autoCreateUser': false, 'credentialInfo': param.credentialInfo };
        let credentialInfo = d9.credentialInfo;
        if (!credentialInfo) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.CREDENTIAL_INVALID));
        }
        let e9 = {
            'phone': () => {
                let req = new ReauthenticateRequest();
                let i9 = credentialInfo;
                let credential = PhoneAuthProvider.credentialWithPasswordAndVerifyCode(i9.countryCode, i9.phoneNumber, i9.password, i9.verifyCode);
                credential.prepareUserReauthRequest(req);
                return req;
            },
            'email': () => {
                let req = new ReauthenticateRequest();
                let h9 = credentialInfo;
                let credential = EmailAuthProvider.credentialWithPasswordAndVerifyCode(h9.email, h9.password, h9.verifyCode);
                credential.prepareUserReauthRequest(req);
                return req;
            }
        };
        let f9 = e9[d9.credentialInfo.kind]();
        f9.setAutoCreateUser(d9.autoCreateUser);
        let g9 = new List();
        g9.add(this.createTokenInterceptor());
        let response = await this.authBackend.post(f9, new ReauthenticateResponse(), g9);
        this.reConfigUserFrom(response);
        await this.syncToStorage();
        return Promise.resolve(new SignInResultImpl(this));
    }
    reConfigUserFrom(response) {
        this.anonymous = false;
        this.uid = response.getUserInfo().getUid();
        this.displayName = response.getUserInfo().getDisplayName();
        this.photoUrl = response.getUserInfo().getPhotoUrl();
        this.email = response.getUserInfo().getEmail();
        this.emailVerified = response.getUserInfo().getEmailVerified();
        this.passwordSetted = response.getUserInfo().getPasswordSetted();
        this.phone = response.getUserInfo().getPhone();
        this.providerId = response.getUserInfo().getProvider().toString();
        this.tokenService.accessToken = response.getAccessToken().getToken();
        this.tokenService.accessTokenValidPeriod = response.getAccessToken().getValidPeriod();
        this.tokenService.refreshToken = response.getRefreshToken().getToken();
        this.tokenService.startTime = new Date().getTime();
        this.providerService.providerInfo = response.getProviders();
    }
    async link(credentialInfo) {
        let s8 = {
            'phone': () => {
                let c9 = credentialInfo;
                return PhoneAuthProvider.credentialWithPasswordAndVerifyCode(c9.countryCode, c9.phoneNumber, c9.password, c9.verifyCode);
            },
            'email': () => {
                let b9 = credentialInfo;
                return EmailAuthProvider.credentialWithPasswordAndVerifyCode(b9.email, b9.password, b9.verifyCode);
            },
            'hwid': async () => {
                let authCode = await HwIdAuthManager.getAuthCode(false);
                return HwIdAuthProvider.credentialWithToken(authCode);
            }
        };
        let credential = await s8[credentialInfo.kind]();
        if (!credential) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.USER_LINK_FAILED));
        }
        let t8 = new UserLinkRequest();
        let u8 = credential.getProvider();
        if (u8 === AGConnectAuthCredentialProvider.Email_Provider ||
            u8 === AGConnectAuthCredentialProvider.Phone_Provider) {
            Logger.info(TAG, 'credential is AccountCredential');
            credential.prepareUserLinkRequest(t8);
        }
        else {
            Logger.info(TAG, 'credential is Oauth2Credential');
            credential.prepareUserLinkRequest(t8);
        }
        let self = this;
        let v8 = new List();
        v8.add(this.createTokenInterceptor());
        let w8 = await this.authBackend.post(t8, new UserLinkResponse(), v8);
        let userInfo = w8.getProviderUserInfo();
        if (userInfo) {
            let map = new Map();
            self.userInfoToMap(userInfo, map);
            if (self.anonymous) {
                self.updateAnonymousUserInfo(map);
            }
            self.providerService.t(map);
            if (map["provider"]) {
                let x8 = map["provider"];
                if (AGConnectAuthCredentialProvider.Email_Provider.toString() === x8) {
                    let a9 = map["email"];
                    if (a9) {
                        self.email = a9;
                        self.emailVerified = 1;
                    }
                }
                else if (AGConnectAuthCredentialProvider.Phone_Provider.toString() === x8) {
                    let z8 = map["phone"];
                    if (z8) {
                        self.phone = z8;
                    }
                }
                if (u8 === AGConnectAuthCredentialProvider.Email_Provider ||
                    u8 === AGConnectAuthCredentialProvider.Phone_Provider) {
                    let y8 = credential;
                    if (y8.password !== undefined && y8.password != null && y8.password !== '') {
                        self.passwordSetted = 1;
                    }
                }
            }
        }
        await this.syncToStorage();
        return Promise.resolve(new SignInResultImpl(this));
    }
    async unlink(type) {
        let p8 = this.convertProvider(type);
        if (!p8) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.USER_UNLINK_FAILED));
        }
        let q8 = new UserUnlinkRequest();
        q8.setProvider(p8);
        let r8 = new List();
        r8.add(this.createTokenInterceptor());
        await this.authBackend.post(q8, new UserUnlinkResponse(), r8);
        this.providerService.u(p8.toString());
        if (p8 === AGConnectAuthCredentialProvider.Email_Provider) {
            this.email = '';
            this.emailVerified = 0;
        }
        if (p8 === AGConnectAuthCredentialProvider.Phone_Provider) {
            this.phone = '';
        }
        if (this.providerService.a1(AGConnectAuthCredentialProvider.Email_Provider.toString()) === undefined &&
            this.providerService.a1(AGConnectAuthCredentialProvider.Phone_Provider.toString()) === undefined) {
            this.passwordSetted = 0;
        }
        await this.syncToStorage();
        return Promise.resolve(new SignInResultImpl(this));
    }
    async updateEmail(m8) {
        if (!m8.email || !m8.verifyCode) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.FAIL_TO_UPDATE_EMAIL));
        }
        let n8 = new UpdateEmailRequest();
        n8.setNewEmail(m8.email);
        n8.setNewVerifyCode(m8.verifyCode);
        n8.setLang(m8.lang);
        let o8 = new List();
        o8.add(this.createTokenInterceptor());
        await this.authBackend.put(n8, new UpdateEmailResponse(), o8);
        this.email = m8.email;
        this.providerService.updateEmail(m8.email);
        await this.syncToStorage();
        return Promise.resolve();
    }
    async updatePhone(i8) {
        let j8 = new UpdatePhoneRequest();
        j8.countryCode = i8.countryCode;
        j8.newPhone = i8.phoneNumber;
        j8.newVerifyCode = i8.verifyCode;
        j8.lang = i8.lang;
        let k8 = new List();
        k8.add(this.createTokenInterceptor());
        await this.authBackend.put(j8, new UpdatePhoneResponse(), k8);
        let l8 = PhoneUtil.combinatePhone(i8.countryCode, i8.phoneNumber);
        this.phone = l8;
        this.providerService.updatePhone(l8);
        await this.syncToStorage();
        return Promise.resolve();
    }
    async updatePassword(e8) {
        let f8 = this.convertProvider(e8.providerType);
        let g8 = new UpdatePasswordRequest();
        g8.setProvider(f8);
        g8.setNewPassword(e8.password);
        g8.setNewverifyCode(e8.verifyCode);
        let h8 = new List();
        h8.add(this.createTokenInterceptor());
        await this.authBackend.put(g8, new UpdatePasswordResponse(), h8);
        if (this.passwordSetted === 0) {
            this.passwordSetted = 1;
        }
        return Promise.resolve();
    }
    async dispose() {
        await this.storeManager?.saveUser(null);
        await this.storeManager.deleteUserInfo();
    }
    async syncToStorage() {
        let info = this.toRawData();
        let d8 = JSON.stringify(info);
        await this.storeManager.saveUser(d8);
    }
    createTokenInterceptor() {
        return new AuthTokenInterceptor(this);
    }
    updateAnonymousUserInfo(info) {
        this.anonymous = false;
        this.displayName = info["displayName"]
            ? info["displayName"]
            : '';
        this.photoUrl = info["photoUrl"] ? info["photoUrl"] : '';
        this.email = info["email"] ? info["email"] : '';
        this.phone = info["phone"] ? info["phone"] : '';
        this.providerId = info["provider"] ? info["provider"] : '';
    }
    userInfoToMap(userInfo, map) {
        if (userInfo.getUid()) {
            map["uid"] = userInfo.getUid().toString();
        }
        if (userInfo.getDisplayName()) {
            map["displayName"] = userInfo.getDisplayName().toString();
        }
        if (userInfo.getPhotoUrl()) {
            map["photoUrl"] = userInfo.getPhotoUrl().toString();
        }
        if (userInfo.getEmail()) {
            map["email"] = userInfo.getEmail().toString();
        }
        if (userInfo.getPhone()) {
            map["phone"] = userInfo.getPhone().toString();
        }
        if (userInfo.getProvider()) {
            map["provider"] = userInfo.getProvider().toString();
        }
        if (userInfo.getOpenId()) {
            map["openId"] = userInfo.getOpenId().toString();
        }
    }
    convertProvider(b8) {
        let c8 = {
            'phone': AGConnectAuthCredentialProvider.Phone_Provider,
            'email': AGConnectAuthCredentialProvider.Email_Provider,
            'hwid': AGConnectAuthCredentialProvider.HMS_Provider
        };
        return c8[b8];
    }
}
class q7 {
    constructor() {
        this.accessToken = '';
        this.accessTokenValidPeriod = -1;
        this.refreshToken = '';
        this.b1 = -1;
        this.startTime = -1;
        this.c1 = 5 * 60 * 1000;
    }
    getAccessToken() {
        return this.accessToken;
    }
    getRefreshToken() {
        return this.refreshToken;
    }
    j() {
        if (!this.accessToken) {
            return false;
        }
        let a8 = this.startTime + this.accessTokenValidPeriod * 1000 - this.c1;
        return new Date().getTime() < a8;
    }
    m() {
        return new TokenImpl(this.accessTokenValidPeriod, this.accessToken);
    }
    async o() {
        if (!this.accessToken || !this.refreshToken) {
            return Promise.reject(new AGCAuthError(AGCAuthErrorCode.NULL_TOKEN));
        }
        let y7 = new RefreshTokenRequest(this.refreshToken);
        let z7 = await new AuthBackend().post(y7, new RefreshTokenResponse());
        this.accessToken = z7.accessToken.getToken();
        this.accessTokenValidPeriod = z7.accessToken.getValidPeriod();
        this.startTime = new Date().getTime();
        return Promise.resolve();
    }
}
class r7 {
    constructor() {
        this.providerInfo = [];
    }
    t(info) {
        if (info && this.providerInfo) {
            let providerId = info["provider"];
            if (providerId) {
                this.u(providerId);
            }
            this.providerInfo.push(info);
        }
    }
    d1(x7, key, value) {
        let index = this.a1(x7.toString());
        if (index !== undefined) {
            this.providerInfo[index][key] = value;
        }
    }
    updateEmail(w7) {
        this.d1(AGConnectAuthCredentialProvider.Email_Provider, "email", w7);
    }
    updatePhone(v7) {
        this.d1(AGConnectAuthCredentialProvider.Phone_Provider, "phone", v7);
    }
    u(u7) {
        let index = this.a1(u7);
        if (!this.providerInfo || index === undefined) {
            return;
        }
        this.providerInfo.splice(index, 1);
    }
    a1(s7) {
        let index = undefined;
        if (s7 && this.providerInfo) {
            for (let t7 = 0; t7 < this.providerInfo.length; t7++) {
                let info = this.providerInfo[t7];
                if (info && s7 === info["provider"]) {
                    index = t7;
                    break;
                }
            }
        }
        return index;
    }
}
