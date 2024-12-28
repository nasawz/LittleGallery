export class AGCAuthErrorCode {
}
AGCAuthErrorCode.NULL_TOKEN = { code: 1210001, message: 'token is null.' };
AGCAuthErrorCode.NOT_SIGN_IN = { code: 1210002, message: 'no user signed in.' };
AGCAuthErrorCode.USER_LINK_FAILED = {
    code: 1210003,
    message: 'credential cannot be null or undefined.'
};
AGCAuthErrorCode.USER_UNLINK_FAILED = {
    code: 1210004,
    message: 'provider cannot be null or undefined.'
};
AGCAuthErrorCode.ALREADY_SIGN_IN_USER = {
    code: 1210005,
    message: 'already sign in a user ,please sign out at first.'
};
AGCAuthErrorCode.FAIL_TO_GET_ACCESS_TOKEN = {
    code: 1210006,
    message: 'get user access token fail.'
};
AGCAuthErrorCode.FAIL_TO_UPDATE_PROFILE = {
    code: 1210007,
    message: 'update user profile fail'
};
AGCAuthErrorCode.FAIL_TO_UPDATE_EMAIL = {
    code: 1210008,
    message: 'email or verify code can not be null or undefined.'
};
AGCAuthErrorCode.CREDENTIAL_INVALID = {
    code: 1210009,
    message: 'credential is null.'
};
