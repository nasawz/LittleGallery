import { HeadingTheme, MarkdownFontStyle, MarkdownTheme } from '../config/MarkdownTheme';
import { Tokens } from '../core';
@Component
export declare struct Heading {
    @Prop
    token: Tokens.Heading;
    @State
    headingFontStyle?: HeadingTheme;
    @Consume(KEY_FONT_STYLE)
    fontStyle: MarkdownFontStyle;
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    @Consume(KEY_LINE_SPACE)
    lineSpace: number;
    @Consume(KEY_TEXT_LINE_SPACE)
    textLineSpace: number;
    aboutToAppear(): void;
    build(): void;
}
