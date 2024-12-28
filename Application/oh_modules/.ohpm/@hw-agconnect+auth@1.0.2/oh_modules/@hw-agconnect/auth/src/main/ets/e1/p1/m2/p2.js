export class ConnectRet {
    constructor(code = 0, msg = '') {
        this.code = code;
        this.msg = msg;
    }
    getCode() {
        return this.code;
    }
    setCode(value) {
        this.code = value;
    }
    getMsg() {
        return this.msg;
    }
    setMsg(value) {
        this.msg = value;
    }
}
