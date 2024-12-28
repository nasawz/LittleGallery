import { AGCError } from "../e1/h2/i2";
export class AGCAuthError extends AGCError {
    constructor(error) {
        super(error.code, error.message);
    }
}
