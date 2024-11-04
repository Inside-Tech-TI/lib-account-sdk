import { IAppSdk } from "../../interface/application/IAppSdk";
import { IContext, IResult, IResultData, IProfile } from "../../interface/types";
export declare class AppMockSdk implements IAppSdk {
    protected app: string;
    protected context: string;
    private contexts;
    constructor(app: string, context: string);
    createContext(contextInfo: IContext): Promise<IResult>;
    removeContext(context: string): Promise<IResult>;
    toggleActiveContext(context: string, active: boolean): Promise<IResult>;
    getContext(context: string): Promise<IContext>;
    listContexts(): Promise<IResultData<IContext[]>>;
    createProfile(context: string, profileInfo: IProfile): Promise<boolean>;
    removeProfile(context: string, profileAlias: string): Promise<boolean>;
    listProfiles(context: string): Promise<IProfile[]>;
}
