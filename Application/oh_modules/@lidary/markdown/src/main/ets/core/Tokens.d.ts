export type MarkedToken = (Tokens.Space | Tokens.Code | Tokens.Heading | Tokens.Table | Tokens.Hr | Tokens.Blockquote | Tokens.List | Tokens.ListItem | Tokens.Paragraph | Tokens.HTML | Tokens.Text | Tokens.Def | Tokens.Escape | Tokens.Tag | Tokens.Image | Tokens.Link | Tokens.Strong | Tokens.Em | Tokens.Codespan | Tokens.Br | Tokens.Del);
export type Token = (MarkedToken | Tokens.Generic);
export declare namespace Tokens {
    interface Space {
        type: 'space';
        raw: string;
    }
    interface Code {
        type: 'code';
        raw: string;
        codeBlockStyle?: 'indented' | undefined;
        lang?: string | undefined;
        text: string;
        escaped?: boolean;
    }
    interface Heading {
        type: 'heading';
        raw: string;
        depth: number;
        text: string;
        tokens: Token[];
    }
    interface Table {
        type: 'table';
        raw: string;
        align: Array<'center' | 'left' | 'right' | null>;
        header: TableCell[];
        rows: TableCell[][];
    }
    interface TableRow {
        text: string;
    }
    interface TableCell {
        text: string;
        tokens: Token[];
        header: boolean;
        align: 'center' | 'left' | 'right' | null;
    }
    interface Hr {
        type: 'hr';
        raw: string;
    }
    interface Blockquote {
        type: 'blockquote';
        raw: string;
        text: string;
        tokens: Token[];
    }
    interface List {
        type: 'list';
        raw: string;
        ordered: boolean;
        start: number | '';
        loose: boolean;
        items: ListItem[];
    }
    interface ListItem {
        type: 'list_item';
        raw: string;
        task: boolean;
        checked?: boolean | undefined;
        loose: boolean;
        text: string;
        tokens: Token[];
    }
    interface Checkbox {
        checked: boolean;
    }
    interface Paragraph {
        type: 'paragraph';
        raw: string;
        pre?: boolean | undefined;
        text: string;
        tokens: Token[];
    }
    interface HTML {
        type: 'html';
        raw: string;
        pre: boolean;
        text: string;
        block: boolean;
    }
    interface Text {
        type: 'text';
        raw: string;
        text: string;
        tokens?: Token[];
    }
    interface Def {
        type: 'def';
        raw: string;
        tag: string;
        href: string;
        title: string;
    }
    interface Escape {
        type: 'escape';
        raw: string;
        text: string;
    }
    interface Tag {
        type: 'text' | 'html';
        raw: string;
        inLink: boolean;
        inRawBlock: boolean;
        text: string;
        block: boolean;
    }
    interface Link {
        type: 'link';
        raw: string;
        href: string;
        title?: string | null;
        text: string;
        tokens: Token[];
    }
    interface Image {
        type: 'image';
        raw: string;
        href: string;
        title: string | null;
        text: string;
    }
    interface Strong {
        type: 'strong';
        raw: string;
        text: string;
        tokens: Token[];
    }
    interface Em {
        type: 'em';
        raw: string;
        text: string;
        tokens: Token[];
    }
    interface Codespan {
        type: 'codespan';
        raw: string;
        text: string;
    }
    interface Br {
        type: 'br';
        raw: string;
    }
    interface Del {
        type: 'del';
        raw: string;
        text: string;
        tokens: Token[];
    }
    interface Generic {
        [index: string]: any;
        type: string;
        raw: string;
        tokens?: Token[] | undefined;
    }
}
export type Links = Record<string, Pick<Tokens.Link | Tokens.Image, 'href' | 'title'>>;
export type TokensList = Token[] & {
    links: Links;
};
