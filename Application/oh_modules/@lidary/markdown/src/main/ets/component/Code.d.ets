import { Tokens } from '../core';
import { MarkdownFontStyle, MarkdownTheme } from '../config/MarkdownTheme';
@Component
export declare struct Code {
    @Prop
    token: Tokens.Code;
    private codes;
    private codeLineHeight;
    @Consume(KEY_FONT_STYLE)
    fontStyle: MarkdownFontStyle;
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    aboutToAppear(): void;
    @Builder
    codeLine(code: string): void;
    build(): void;
}
