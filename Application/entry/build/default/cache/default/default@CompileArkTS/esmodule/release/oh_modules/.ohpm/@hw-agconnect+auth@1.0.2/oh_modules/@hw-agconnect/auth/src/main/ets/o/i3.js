export class UserInfo {
    constructor() {
        this.uid = '';
        this.displayName = '';
        this.photoUrl = '';
        this.phone = '';
        this.email = '';
        this.provider = -1;
        this.openId = '';
        this.emailVerified = 0;
        this.passwordSetted = 0;
    }
    getUid() {
        return this.uid;
    }
    setUid(uid) {
        this.uid = uid;
    }
    getDisplayName() {
        return this.displayName;
    }
    setDisplayName(displayName) {
        this.displayName = displayName;
    }
    getPhotoUrl() {
        return this.photoUrl;
    }
    setPhotoUrl(k3) {
        this.photoUrl = k3;
    }
    getPhone() {
        return this.phone;
    }
    setPhone(phone) {
        this.phone = phone;
    }
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    getProvider() {
        return this.provider;
    }
    setProvider(j3) {
        this.provider = j3;
    }
    getOpenId() {
        return this.openId;
    }
    setOpenId(i3) {
        this.openId = i3;
    }
    getEmailVerified() {
        return this.emailVerified;
    }
    setEmailVerified(h3) {
        this.emailVerified = h3;
    }
    getPasswordSetted() {
        return this.passwordSetted;
    }
    setPasswordSetted(g3) {
        this.passwordSetted = g3;
    }
}
