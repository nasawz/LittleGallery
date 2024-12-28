import type { MarkedOptions } from './MarkedOptions';
import type { Tokens } from './Tokens';
import type { _Parser } from './Parser';
/**
 * Renderer
 */
export declare class _Renderer {
    options: MarkedOptions;
    parser: _Parser;
    constructor(options?: MarkedOptions);
    space(token: Tokens.Space): string;
    code({ text, lang, escaped }: Tokens.Code): string;
    blockquote({ tokens }: Tokens.Blockquote): string;
    html({ text }: Tokens.HTML | Tokens.Tag): string;
    heading({ tokens, depth }: Tokens.Heading): string;
    hr(token: Tokens.Hr): string;
    list(token: Tokens.List): string;
    listitem(item: Tokens.ListItem): string;
    checkbox({ checked }: Tokens.Checkbox): string;
    paragraph({ tokens }: Tokens.Paragraph): string;
    table(token: Tokens.Table): string;
    tablerow({ text }: Tokens.TableRow): string;
    tablecell(token: Tokens.TableCell): string;
    /**
     * span level renderer
     */
    strong({ tokens }: Tokens.Strong): string;
    em({ tokens }: Tokens.Em): string;
    codespan({ text }: Tokens.Codespan): string;
    br(token: Tokens.Br): string;
    del({ tokens }: Tokens.Del): string;
    link({ href, title, tokens }: Tokens.Link): string;
    image({ href, title, text }: Tokens.Image): string;
    text(token: Tokens.Text | Tokens.Escape | Tokens.Tag): string;
}
