import type { Token, TokensList } from './Tokens';
import type { MarkedOptions } from './MarkedOptions';
/**
 * Block Lexer
 */
export declare class _Lexer {
    tokens: TokensList;
    options: MarkedOptions;
    state: {
        inLink: boolean;
        inRawBlock: boolean;
        top: boolean;
    };
    private tokenizer;
    private inlineQueue;
    constructor(options?: MarkedOptions);
    /**
     * Expose Rules
     */
    static get rules(): {
        block: {
            normal: {
                blockquote: RegExp;
                code: RegExp;
                def: RegExp;
                fences: RegExp;
                heading: RegExp;
                hr: RegExp;
                html: RegExp;
                lheading: RegExp;
                list: RegExp;
                newline: RegExp;
                paragraph: RegExp;
                table: RegExp;
                text: RegExp;
            };
            gfm: Record<"text" | "code" | "heading" | "table" | "hr" | "blockquote" | "list" | "paragraph" | "html" | "def" | "fences" | "lheading" | "newline", RegExp>;
            pedantic: Record<"text" | "code" | "heading" | "table" | "hr" | "blockquote" | "list" | "paragraph" | "html" | "def" | "fences" | "lheading" | "newline", RegExp>;
        };
        inline: {
            normal: {
                _backpedal: RegExp;
                anyPunctuation: RegExp;
                autolink: RegExp;
                blockSkip: RegExp;
                br: RegExp;
                code: RegExp;
                del: RegExp;
                emStrongLDelim: RegExp;
                emStrongRDelimAst: RegExp;
                emStrongRDelimUnd: RegExp;
                escape: RegExp;
                link: RegExp;
                nolink: RegExp;
                punctuation: RegExp;
                reflink: RegExp;
                reflinkSearch: RegExp;
                tag: RegExp;
                text: RegExp;
                url: RegExp;
            };
            gfm: Record<"text" | "code" | "escape" | "link" | "br" | "del" | "tag" | "reflink" | "autolink" | "url" | "nolink" | "_backpedal" | "anyPunctuation" | "blockSkip" | "emStrongLDelim" | "emStrongRDelimAst" | "emStrongRDelimUnd" | "punctuation" | "reflinkSearch", RegExp>;
            breaks: Record<"text" | "code" | "escape" | "link" | "br" | "del" | "tag" | "reflink" | "autolink" | "url" | "nolink" | "_backpedal" | "anyPunctuation" | "blockSkip" | "emStrongLDelim" | "emStrongRDelimAst" | "emStrongRDelimUnd" | "punctuation" | "reflinkSearch", RegExp>;
            pedantic: Record<"text" | "code" | "escape" | "link" | "br" | "del" | "tag" | "reflink" | "autolink" | "url" | "nolink" | "_backpedal" | "anyPunctuation" | "blockSkip" | "emStrongLDelim" | "emStrongRDelimAst" | "emStrongRDelimUnd" | "punctuation" | "reflinkSearch", RegExp>;
        };
    };
    /**
     * Static Lex Method
     */
    static lex(src: string, options?: MarkedOptions): TokensList;
    /**
     * Static Lex Inline Method
     */
    static lexInline(src: string, options?: MarkedOptions): Token[];
    /**
     * Preprocessing
     */
    lex(src: string): TokensList;
    /**
     * Lexing
     */
    blockTokens(src: string, tokens?: Token[], lastParagraphClipped?: boolean): Token[];
    blockTokens(src: string, tokens?: TokensList, lastParagraphClipped?: boolean): TokensList;
    inline(src: string, tokens?: Token[]): Token[];
    /**
     * Lexing/Compiling
     */
    inlineTokens(src: string, tokens?: Token[]): Token[];
}
