export declare function escape(html: string, encode?: boolean): string;
export declare function unescape(html: string): string;
export declare function edit(regex: string | RegExp, opt?: string): {
    replace: (name: string | RegExp, val: string | RegExp) => any;
    getRegex: () => RegExp;
};
export declare function cleanUrl(href: string): string;
export declare const noopTest: RegExp;
export declare function splitCells(tableRow: string, count?: number): string[];
/**
 * Remove trailing 'c's. Equivalent to str.replace(/c*$/, '').
 * /c*$/ is vulnerable to REDOS.
 *
 * @param str
 * @param c
 * @param invert Remove suffix of non-c chars instead. Default falsey.
 */
export declare function rtrim(str: string, c: string, invert?: boolean): string;
export declare function findClosingBracket(str: string, b: string): number;
