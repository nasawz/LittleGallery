import { AGCError } from "@normalized:N&&&@hw-agconnect/auth/src/main/ets/e1/h2/i2&1.0.2";
export class AGCAuthError extends AGCError {
    constructor(error) {
        super(error.code, error.message);
    }
}
