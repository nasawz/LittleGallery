import { AGCError } from "./i2";
export declare enum t2 {
    INIT_ERROR = 1100001,
    JSON_FILE_ERROR = 1100002,
    DATASTORE_ERROR = 1100003
}
export declare function error(code: t2, message: string): AGCError;
