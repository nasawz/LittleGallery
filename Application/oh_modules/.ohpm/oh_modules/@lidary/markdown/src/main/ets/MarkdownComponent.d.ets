import { MarkdownFontStyle, MarkdownTheme } from './config/MarkdownTheme';
import { Token } from './core';
@Component
export declare struct MarkdownComponent {
    @Prop
    tokenList: Token[];
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    @Consume(KEY_LINE_SPACE)
    lineSpace: number;
    @Consume(KEY_FONT_STYLE)
    fontStyle: MarkdownFontStyle;
    build(): void;
}
