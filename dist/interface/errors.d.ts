export declare class HttpError extends Error {
    status: number;
    messages?: string[];
    data?: any;
    constructor(status: number, messages?: string[] | string);
}
