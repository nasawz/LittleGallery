import { MarkdownTheme } from '../../config/MarkdownTheme';
@Component
export declare struct SpanImage {
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    href: string;
    @State
    imgWidth?: number;
    @Consume(KEY_LINE_SPACE)
    lineSpace: number;
    build(): void;
}
