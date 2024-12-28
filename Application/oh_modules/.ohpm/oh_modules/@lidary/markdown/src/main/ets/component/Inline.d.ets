import { MarkdownFontStyle, MarkdownTheme } from '../config/MarkdownTheme';
import { Token } from '../core';
@Component
export declare struct Inline {
    maxLine?: number;
    @Prop
    token: Token[];
    @Consume(KEY_FONT_STYLE)
    fontStyle: MarkdownFontStyle;
    @Consume(KEY_LINE_SPACE)
    lineSpace: number;
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    @Consume(KEY_TEXT_LINE_SPACE)
    textLineSpace: number;
    @Consume
    mdInlineModifier: AttributeModifier<TextAttribute>;
    build(): void;
}
