import type { MarkedOptions } from './MarkedOptions';
import type { Token, TokensList } from './Tokens';
export declare class _Hooks {
    options: MarkedOptions;
    constructor(options?: MarkedOptions);
    static passThroughHooks: Set<string>;
    /**
     * Process markdown before marked
     */
    preprocess(markdown: string): string;
    /**
     * Process HTML after marked is finished
     */
    postprocess(html: string): string;
    /**
     * Process all tokens before walk tokens
     */
    processAllTokens(tokens: Token[] | TokensList): Token[] | TokensList;
}
