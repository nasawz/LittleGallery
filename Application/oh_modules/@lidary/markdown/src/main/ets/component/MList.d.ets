import { Tokens } from '../core';
@Component
export declare struct MList {
    @Prop
    tokens: Tokens.List;
    @Consume(KEY_LINE_SPACE)
    lineSpace: number;
    build(): void;
}
