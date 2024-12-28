import { MarkdownTheme } from '../config/MarkdownTheme';
import { Tokens } from '../core/Tokens';
@Component
export declare struct BlockQuote {
    @Prop
    token: Tokens.Blockquote;
    @State
    blockHeight: Length;
    @Consume(KEY_THEME)
    theme: MarkdownTheme;
    @Consume(KEY_LINE_SPACE)
    lineSpace: number;
    build(): void;
}
