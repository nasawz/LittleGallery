export class EmailUserBuilder {
    constructor() {
        this.email = '';
        this.password = '';
        this.verifyCode = '';
    }
    setEmail(email) {
        this.email = email;
        return this;
    }
    setPassword(password) {
        this.password = password;
        return this;
    }
    setVerifyCode(b3) {
        this.verifyCode = b3;
        return this;
    }
    build() {
        return {
            email: this.email,
            password: this.password,
            verifyCode: this.verifyCode
        };
    }
}
