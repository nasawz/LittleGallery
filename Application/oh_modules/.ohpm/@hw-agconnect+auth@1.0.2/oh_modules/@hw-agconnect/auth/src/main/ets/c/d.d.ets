import { AGCError } from "../e1/h2/i2";
import { AuthErrorCode } from "./l1";
export declare class AGCAuthError extends AGCError {
    constructor(error: AuthErrorCode);
}
