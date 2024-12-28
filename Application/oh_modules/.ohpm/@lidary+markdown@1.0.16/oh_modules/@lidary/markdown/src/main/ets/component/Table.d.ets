import { MarkdownFontStyle, MarkdownTheme } from '../config/MarkdownTheme';
import { Tokens } from '../core';
@Component
export declare struct Table {
    @Prop
    token: Tokens.Table;
    @State
    itemMaxWidth: Map<number, number>;
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    build(): void;
}
@Component
export declare struct TableHeader {
    tokens: Tokens.TableCell[];
    @Link
    itemMaxWidth: Map<number, number>;
    @Consume(KEY_FONT_STYLE)
    fontStyle: MarkdownFontStyle;
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    build(): void;
}
