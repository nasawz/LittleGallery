import auth from '@normalized:N&&&@hw-agconnect/auth/Index&1.0.2';
export class CloudCommonAuthProvider {
    async getAccessToken(isForceRefresh) {
        let user = await auth.getCurrentUser();
        if (user == null) {
            return Promise.resolve('');
        }
        let w9 = await user.getToken(isForceRefresh);
        let result = CloudCommonAuthProvider.AGC_AUTH_PREFIX + w9.getString();
        return Promise.resolve(result);
    }
}
CloudCommonAuthProvider.AGC_AUTH_PREFIX = 'agcauth:';
