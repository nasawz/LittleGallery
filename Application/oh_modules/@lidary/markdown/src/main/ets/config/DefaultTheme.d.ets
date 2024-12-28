import { MarkdownTheme } from './MarkdownTheme';
/**
 * 合并theme 将外部传入的theme内的空字段用defaultTheme()的值覆盖
 * @returns
 */
export declare function mergeTheme(theme?: MarkdownTheme): MarkdownTheme;
export declare const defaultTheme: MarkdownTheme;
