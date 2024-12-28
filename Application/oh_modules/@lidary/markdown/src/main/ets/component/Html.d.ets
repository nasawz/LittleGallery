import { MarkdownFontStyle, MarkdownTheme } from '../config/MarkdownTheme';
@Component
export declare struct Html {
    @Prop
    html: string;
    @Consume(KEY_FONT_STYLE)
    fontStyle: MarkdownFontStyle;
    @Consume(KEY_LINE_SPACE)
    lineSpace: number;
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    @Consume(KEY_TEXT_LINE_SPACE)
    textLineSpace: number;
    build(): void;
}
