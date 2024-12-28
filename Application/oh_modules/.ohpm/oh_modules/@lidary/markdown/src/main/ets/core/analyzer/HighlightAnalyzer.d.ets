export type CodeType = 'code' | 'keyword' | 'type' | 'number' | 'symbol' | 'string' | 'text' | 'boolean';
export interface CodeToken {
    type: CodeType;
    text: string;
}
export declare function highlightCodeAnalyzer(code: string): CodeToken[];
