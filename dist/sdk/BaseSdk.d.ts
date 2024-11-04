import { AxiosInstance } from "axios";
export declare abstract class BaseSdk {
    protected endpoint: string;
    protected apiToken: string;
    protected axiosInstance: AxiosInstance;
    constructor(endpoint: string, apiToken: string);
    protected getAxiosUser(token: string): AxiosInstance;
}
export declare const getAxiosInstance: (baseURL: string, apiToken: string, userToken?: string) => AxiosInstance;
