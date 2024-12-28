import { AGCError } from "./i2";
export var t2;
(function (v2) {
    v2[v2["INIT_ERROR"] = 1100001] = "INIT_ERROR";
    v2[v2["JSON_FILE_ERROR"] = 1100002] = "JSON_FILE_ERROR";
    v2[v2["DATASTORE_ERROR"] = 1100003] = "DATASTORE_ERROR";
})(t2 || (t2 = {}));
export function error(code, message) {
    return new AGCError(code, message);
}
