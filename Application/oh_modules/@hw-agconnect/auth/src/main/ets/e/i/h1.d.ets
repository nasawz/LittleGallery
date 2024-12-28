import { AuthBaseRequest } from "./o3";
export declare class SignOutRequest extends AuthBaseRequest {
    bodyAccessToken: string;
    refreshToken: string;
    protected readonly URL_PATH_SURFFIX = "/user-signout";
    body(): Promise<Record<string, object | number | string>>;
}
