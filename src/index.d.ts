export interface SCInput {
    text: string;
    converter: SCConverter[];
}
export interface SCConverter {
    name: string;
    option: any[];
    text?: string;
    fallback?: number;
    status?: string;
    error?: unknown[];
}
export interface SCOptions {
    converter: {
        [key: string]: Function[];
    };
}
export interface SCOutput {
    text: string;
    result: SCConverter[];
}
export declare class SC {
    version: string;
    options: SCOptions;
    constructor(userOptions?: SCOptions | {});
    convert(input: SCInput): Promise<SCOutput>;
}
