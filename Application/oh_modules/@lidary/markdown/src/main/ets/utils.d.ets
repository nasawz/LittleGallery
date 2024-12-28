import { Token } from './core';
/**
 * 清理实体字符
 * @param content
 * @returns
 */
export declare function clearMarkdown(content: string): string;
/**
 * 判断字符串的第一个字符是否为数字
 * @param str 要检查的字符串
 * @returns 如果第一个字符是数字，则返回 true；否则返回 false
 */
export declare function isFirstCharDigit(str: string): boolean;
export declare function parseMarkdown(content: string): Token[];
export declare function copyToPasteboard(text?: string): Promise<void>;
