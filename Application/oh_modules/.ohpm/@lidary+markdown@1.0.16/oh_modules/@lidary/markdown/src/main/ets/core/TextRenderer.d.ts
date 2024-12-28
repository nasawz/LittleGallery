import type { Tokens } from './Tokens';
/**
 * TextRenderer
 * returns only the textual part of the token
 */
export declare class _TextRenderer {
    strong({ text }: Tokens.Strong): string;
    em({ text }: Tokens.Em): string;
    codespan({ text }: Tokens.Codespan): string;
    del({ text }: Tokens.Del): string;
    html({ text }: Tokens.HTML | Tokens.Tag): string;
    text({ text }: Tokens.Text | Tokens.Escape | Tokens.Tag): string;
    link({ text }: Tokens.Link): string;
    image({ text }: Tokens.Image): string;
    br(): string;
}
