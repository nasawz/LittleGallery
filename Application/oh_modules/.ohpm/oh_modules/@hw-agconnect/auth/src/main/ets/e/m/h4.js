import { BaseResponse } from "../../e1/p1/m2/q2";
export class UserExtraResponse extends BaseResponse {
    constructor() {
        super();
        this.displayName = '';
        this.photoUrl = '';
        this.emailVerified = 0;
        this.passwordSetted = 0;
        this.email = '';
        this.phone = '';
        this.userExtra = new UserExtra();
        this.userMetaData = new UserMetaData();
    }
    constructResponse(response) {
        let res = response;
        this.displayName = res.displayName;
        this.photoUrl = res.photoUrl;
        this.emailVerified = res.emailVerified;
        this.passwordSetted = res.passwordSetted;
        this.email = res.email;
        this.phone = res.phone;
        this.userExtra.createTime = res.userMetaData.createTime;
        this.userExtra.lastSignInTime = res.userMetaData.lastSignInTime;
        this.ret.setMsg(res.ret.msg);
        this.ret.setCode(res.ret.code);
        return true;
    }
}
export class UserExtra {
    constructor() {
        this.createTime = '';
        this.lastSignInTime = '';
    }
    getCreateTime() {
        return this.createTime;
    }
    getLastSignInTime() {
        return this.lastSignInTime;
    }
}
export class UserMetaData {
    constructor() {
        this.createTime = '';
        this.lastSignInTime = '';
    }
}
