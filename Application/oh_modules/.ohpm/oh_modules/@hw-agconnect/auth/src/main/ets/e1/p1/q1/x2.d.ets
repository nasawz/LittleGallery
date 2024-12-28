import { Token } from "../../../b";
export declare class TokenImpl implements Token {
    expiration: number;
    tokenString: string;
    constructor(expiration: number, tokenString: string);
}
