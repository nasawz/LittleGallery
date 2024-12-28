import { _Renderer } from './Renderer';
import { _TextRenderer } from './TextRenderer';
import type { Token } from './Tokens';
import type { MarkedOptions } from './MarkedOptions';
/**
 * Parsing & Compiling
 */
export declare class _Parser {
    options: MarkedOptions;
    renderer: _Renderer;
    textRenderer: _TextRenderer;
    constructor(options?: MarkedOptions);
    /**
     * Static Parse Method
     */
    static parse(tokens: Token[], options?: MarkedOptions): string;
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens: Token[], options?: MarkedOptions): string;
    /**
     * Parse Loop
     */
    parse(tokens: Token[], top?: boolean): string;
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens: Token[], renderer?: _Renderer | _TextRenderer): string;
}
