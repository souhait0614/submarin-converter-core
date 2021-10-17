interface SCInput {
    text: string;
    converter: SCConverter[];
}
interface SCConverter {
    name: string;
    option: any[];
    text?: string;
    status?: string;
    error?: unknown;
}
interface SCOptions {
    converter: {
        [key: string]: Function;
    };
}
interface SCOutput {
    text: string;
    result: SCConverter[];
}
declare class SC {
    version: string;
    options: SCOptions;
    constructor(userOptions?: SCOptions | {});
    convert(input: SCInput): Promise<SCOutput>;
}
export { SC };
