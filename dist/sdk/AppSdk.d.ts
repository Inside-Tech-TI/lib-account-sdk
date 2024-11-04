import { IAppSdk } from "../interface/application/IAppSdk";
import { IContext, IResult, IResultData, IProfile } from "../interface/types";
import { BaseSdk } from "./BaseSdk";
export declare const appPaths: {
    contextInfo: string;
    createContext: string;
    removeContext: string;
    toggleActiveContext: string;
    listContexts: string;
    createProfile: string;
    removeProfile: string;
    listProfiles: string;
};
export declare class AppSdk extends BaseSdk implements IAppSdk {
    createContext(contextInfo: IContext): Promise<IResult>;
    removeContext(context: string): Promise<IResult>;
    toggleActiveContext(context: string, active: boolean): Promise<IResult>;
    getContext(context: string): Promise<IContext>;
    listContexts(): Promise<IResultData<IContext[]>>;
    createProfile(context: string, profileInfo: IProfile): Promise<boolean>;
    removeProfile(context: string, profileAlias: string): Promise<boolean>;
    listProfiles(context: string): Promise<IProfile[]>;
}
