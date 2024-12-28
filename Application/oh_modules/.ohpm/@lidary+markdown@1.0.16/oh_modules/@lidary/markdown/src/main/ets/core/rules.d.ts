/**
 * Normal Block Grammar
 */
declare const blockNormal: {
    blockquote: RegExp;
    code: RegExp;
    def: RegExp;
    fences: RegExp;
    heading: RegExp;
    hr: RegExp;
    html: RegExp;
    lheading: RegExp;
    list: RegExp;
    newline: RegExp;
    paragraph: RegExp;
    table: RegExp;
    text: RegExp;
};
type BlockKeys = keyof typeof blockNormal;
/**
 * Normal Inline Grammar
 */
declare const inlineNormal: {
    _backpedal: RegExp;
    anyPunctuation: RegExp;
    autolink: RegExp;
    blockSkip: RegExp;
    br: RegExp;
    code: RegExp;
    del: RegExp;
    emStrongLDelim: RegExp;
    emStrongRDelimAst: RegExp;
    emStrongRDelimUnd: RegExp;
    escape: RegExp;
    link: RegExp;
    nolink: RegExp;
    punctuation: RegExp;
    reflink: RegExp;
    reflinkSearch: RegExp;
    tag: RegExp;
    text: RegExp;
    url: RegExp;
};
type InlineKeys = keyof typeof inlineNormal;
/**
 * exports
 */
export declare const block: {
    normal: {
        blockquote: RegExp;
        code: RegExp;
        def: RegExp;
        fences: RegExp;
        heading: RegExp;
        hr: RegExp;
        html: RegExp;
        lheading: RegExp;
        list: RegExp;
        newline: RegExp;
        paragraph: RegExp;
        table: RegExp;
        text: RegExp;
    };
    gfm: Record<"text" | "code" | "heading" | "table" | "hr" | "blockquote" | "list" | "paragraph" | "html" | "def" | "fences" | "lheading" | "newline", RegExp>;
    pedantic: Record<"text" | "code" | "heading" | "table" | "hr" | "blockquote" | "list" | "paragraph" | "html" | "def" | "fences" | "lheading" | "newline", RegExp>;
};
export declare const inline: {
    normal: {
        _backpedal: RegExp;
        anyPunctuation: RegExp;
        autolink: RegExp;
        blockSkip: RegExp;
        br: RegExp;
        code: RegExp;
        del: RegExp;
        emStrongLDelim: RegExp;
        emStrongRDelimAst: RegExp;
        emStrongRDelimUnd: RegExp;
        escape: RegExp;
        link: RegExp;
        nolink: RegExp;
        punctuation: RegExp;
        reflink: RegExp;
        reflinkSearch: RegExp;
        tag: RegExp;
        text: RegExp;
        url: RegExp;
    };
    gfm: Record<"text" | "code" | "escape" | "link" | "br" | "del" | "tag" | "reflink" | "autolink" | "url" | "nolink" | "_backpedal" | "anyPunctuation" | "blockSkip" | "emStrongLDelim" | "emStrongRDelimAst" | "emStrongRDelimUnd" | "punctuation" | "reflinkSearch", RegExp>;
    breaks: Record<"text" | "code" | "escape" | "link" | "br" | "del" | "tag" | "reflink" | "autolink" | "url" | "nolink" | "_backpedal" | "anyPunctuation" | "blockSkip" | "emStrongLDelim" | "emStrongRDelimAst" | "emStrongRDelimUnd" | "punctuation" | "reflinkSearch", RegExp>;
    pedantic: Record<"text" | "code" | "escape" | "link" | "br" | "del" | "tag" | "reflink" | "autolink" | "url" | "nolink" | "_backpedal" | "anyPunctuation" | "blockSkip" | "emStrongLDelim" | "emStrongRDelimAst" | "emStrongRDelimUnd" | "punctuation" | "reflinkSearch", RegExp>;
};
export interface Rules {
    block: Record<BlockKeys, RegExp>;
    inline: Record<InlineKeys, RegExp>;
}
export {};
