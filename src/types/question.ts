export type question = {
    q: string;
    as: string[];
    fun: (attrs: number[], input: number) => number;
}
