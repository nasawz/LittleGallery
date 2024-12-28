import { Token } from './core';
import { MarkdownFontStyle, MarkdownTheme } from './config/MarkdownTheme';
@Component
export declare struct Markdown {
    @Prop
    content: string;
    @Prop
    tokenList: Token[];
    @Prop
    theme: MarkdownTheme;
    @Prop
    lineSpace: number;
    @Prop
    textLineSpace: number;
    @Prop
    fontStyle: MarkdownFontStyle;
    @Provide
    mdInlineModifier?: AttributeModifier<TextAttribute>;
    @Provide(KEY_THEME)
    _theme: MarkdownTheme;
    @Provide(KEY_LINE_SPACE)
    _lineSpace: number;
    @Provide(KEY_TEXT_LINE_SPACE)
    _textLineSpace: number;
    @Provide(KEY_FONT_STYLE)
    _fontStyle: MarkdownFontStyle;
    aboutToAppear(): void;
    watchTheme(): void;
    watchTextLineSpace(): void;
    watchLineSpace(): void;
    watchDefaultFont(): void;
    watchContent(): void;
    build(): void;
}
