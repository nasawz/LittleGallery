import { _Lexer } from './Lexer';
import { _Parser } from './Parser';
import { _Tokenizer } from './Tokenizer';
import { _Renderer } from './Renderer';
import { _TextRenderer } from './TextRenderer';
import { _Hooks } from './Hooks';
import { _getDefaults } from './defaults';
import type { MarkedExtension, MarkedOptions } from './MarkedOptions';
import type { Token, TokensList } from './Tokens';
import type { MaybePromise } from './Instance';
/**
 * Compiles markdown to HTML asynchronously.
 *
 * @param src String of markdown source to be compiled
 * @param options Hash of options, having async: true
 * @return Promise of string of compiled HTML
 */
export declare function marked(src: string, options: MarkedOptions & {
    async: true;
}): Promise<string>;
/**
 * Compiles markdown to HTML.
 *
 * @param src String of markdown source to be compiled
 * @param options Optional hash of options
 * @return String of compiled HTML. Will be a Promise of string if async is set to true by any extensions.
 */
export declare function marked(src: string, options?: MarkedOptions): string | Promise<string>;
export declare namespace marked {
    var options: (options: MarkedOptions) => typeof marked;
    var setOptions: (options: MarkedOptions) => typeof marked;
    var getDefaults: typeof _getDefaults;
    var defaults: MarkedOptions;
    var use: (...args: MarkedExtension[]) => typeof marked;
    var walkTokens: (tokens: Token[] | TokensList, callback: (token: Token) => MaybePromise | MaybePromise[]) => MaybePromise[];
    var parseInline: (src: string, options?: MarkedOptions) => string | Promise<string>;
    var Parser: typeof _Parser;
    var parser: typeof _Parser.parse;
    var Renderer: typeof _Renderer;
    var TextRenderer: typeof _TextRenderer;
    var Lexer: typeof _Lexer;
    var lexer: typeof _Lexer.lex;
    var Tokenizer: typeof _Tokenizer;
    var Hooks: typeof _Hooks;
    var parse: typeof marked;
}
export declare const options: (options: MarkedOptions) => typeof marked;
export declare const setOptions: (options: MarkedOptions) => typeof marked;
export declare const use: (...args: MarkedExtension[]) => typeof marked;
export declare const walkTokens: (tokens: Token[] | TokensList, callback: (token: Token) => MaybePromise | MaybePromise[]) => MaybePromise[];
export declare const parseInline: (src: string, options?: MarkedOptions) => string | Promise<string>;
export declare const parse: typeof marked;
export declare const parser: typeof _Parser.parse;
export declare const lexer: typeof _Lexer.lex;
export { _defaults as defaults, _getDefaults as getDefaults } from './defaults';
export { _Lexer as Lexer } from './Lexer';
export { _Parser as Parser } from './Parser';
export { _Tokenizer as Tokenizer } from './Tokenizer';
export { _Renderer as Renderer } from './Renderer';
export { _TextRenderer as TextRenderer } from './TextRenderer';
export { _Hooks as Hooks } from './Hooks';
export { Marked } from './Instance';
export * from './MarkedOptions';
export * from './rules';
export * from './Tokens';
