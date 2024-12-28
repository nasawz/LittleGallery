import { MarkdownTheme } from './config/MarkdownTheme';
import { TokenizerExtension, Tokens } from './core';
export declare namespace markConfig {
    let theme: MarkdownTheme;
    let customBlockBuilder: WrappedBuilder<[string, Tokens.Generic, ESObject]>;
    let customInlineBuilder: WrappedBuilder<[string, Tokens.Generic, ESObject]>;
    function setTheme(markTheme: MarkdownTheme): void;
    function addPlugin(plugins: TokenizerExtension[]): void;
    let registerImageClick: ImageClick;
    let registerLinkClick: LinkClick;
}
type ImageClick = (url?: string) => void;
type LinkClick = (url?: string) => void;
export {};
