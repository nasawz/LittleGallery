export var GRS_TYPE;
(function (GRS_TYPE) {
    GRS_TYPE[GRS_TYPE["AGC_GW"] = 0] = "AGC_GW";
    GRS_TYPE[GRS_TYPE["AGC_GW_BACK"] = 1] = "AGC_GW_BACK";
    GRS_TYPE[GRS_TYPE["WEBSOCKET_GW"] = 2] = "WEBSOCKET_GW";
    GRS_TYPE[GRS_TYPE["WEBSOCKET_GW_BACK"] = 3] = "WEBSOCKET_GW_BACK";
    GRS_TYPE[GRS_TYPE["STORAGE_GW"] = 4] = "STORAGE_GW";
    GRS_TYPE[GRS_TYPE["STORAGE_GW_BACK"] = 5] = "STORAGE_GW_BACK";
})(GRS_TYPE || (GRS_TYPE = {}));
export var Region;
(function (Region) {
    Region["CN"] = "CN";
    Region["DE"] = "DE";
    Region["RU"] = "RU";
    Region["SG"] = "SG";
})(Region || (Region = {}));
export var VerifyCodeAction;
(function (VerifyCodeAction) {
    VerifyCodeAction[VerifyCodeAction["REGISTER_LOGIN"] = 1001] = "REGISTER_LOGIN";
    VerifyCodeAction[VerifyCodeAction["RESET_PASSWORD"] = 1002] = "RESET_PASSWORD";
})(VerifyCodeAction || (VerifyCodeAction = {}));
export { AGCAuthError } from "./c/d";
