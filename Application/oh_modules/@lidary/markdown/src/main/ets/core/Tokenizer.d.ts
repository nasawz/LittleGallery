import type { Rules } from './rules';
import type { _Lexer } from './Lexer';
import type { Links, Tokens } from './Tokens';
import type { MarkedOptions } from './MarkedOptions';
/**
 * Tokenizer
 */
export declare class _Tokenizer {
    options: MarkedOptions;
    rules: Rules;
    lexer: _Lexer;
    constructor(options?: MarkedOptions);
    space(src: string): Tokens.Space | undefined;
    code(src: string): Tokens.Code | undefined;
    fences(src: string): Tokens.Code | undefined;
    heading(src: string): Tokens.Heading | undefined;
    hr(src: string): Tokens.Hr | undefined;
    blockquote(src: string): Tokens.Blockquote | undefined;
    list(src: string): Tokens.List | undefined;
    html(src: string): Tokens.HTML | undefined;
    def(src: string): Tokens.Def | undefined;
    table(src: string): Tokens.Table | undefined;
    lheading(src: string): Tokens.Heading | undefined;
    paragraph(src: string): Tokens.Paragraph | undefined;
    text(src: string): Tokens.Text | undefined;
    escape(src: string): Tokens.Escape | undefined;
    tag(src: string): Tokens.Tag | undefined;
    link(src: string): Tokens.Link | Tokens.Image | undefined;
    reflink(src: string, links: Links): Tokens.Link | Tokens.Image | Tokens.Text | undefined;
    emStrong(src: string, maskedSrc: string, prevChar?: string): Tokens.Em | Tokens.Strong | undefined;
    codespan(src: string): Tokens.Codespan | undefined;
    br(src: string): Tokens.Br | undefined;
    del(src: string): Tokens.Del | undefined;
    autolink(src: string): Tokens.Link | undefined;
    url(src: string): Tokens.Link | undefined;
    inlineText(src: string): Tokens.Text | undefined;
}
