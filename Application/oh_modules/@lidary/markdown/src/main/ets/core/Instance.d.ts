import { _Lexer } from './Lexer';
import { _Parser } from './Parser';
import { _Hooks } from './Hooks';
import { _Renderer } from './Renderer';
import { _Tokenizer } from './Tokenizer';
import { _TextRenderer } from './TextRenderer';
import type { MarkedExtension, MarkedOptions } from './MarkedOptions';
import type { Token, TokensList } from './Tokens';
export type MaybePromise = void | Promise<void>;
export declare class Marked {
    #private;
    defaults: MarkedOptions;
    options: (opt: MarkedOptions) => this;
    parse: (src: string, options?: MarkedOptions | undefined | null) => string | Promise<string>;
    parseInline: (src: string, options?: MarkedOptions | undefined | null) => string | Promise<string>;
    Parser: typeof _Parser;
    Renderer: typeof _Renderer;
    TextRenderer: typeof _TextRenderer;
    Lexer: typeof _Lexer;
    Tokenizer: typeof _Tokenizer;
    Hooks: typeof _Hooks;
    constructor(...args: MarkedExtension[]);
    /**
     * Run callback for every token
     */
    walkTokens(tokens: Token[] | TokensList, callback: (token: Token) => MaybePromise | MaybePromise[]): MaybePromise[];
    use(...args: MarkedExtension[]): this;
    setOptions(opt: MarkedOptions): this;
    lexer(src: string, options?: MarkedOptions): TokensList;
    parser(tokens: Token[], options?: MarkedOptions): string;
}
