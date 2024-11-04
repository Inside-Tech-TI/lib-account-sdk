import { IContext, IProfile, IResult, IResultData } from "../types";

// interface para que uma api consiga criar contextos e profiles novos que antes não existiam e que possa manipular os contextos e profiles existentes
export interface IAppSdk {
  createContext(contextInfo: IContext): Promise<IResult>;
  removeContext(context: string): Promise<IResult>;
  toggleActiveContext(context: string, active: boolean): Promise<IResult>;
  getContext(context: string): Promise<IContext>;
  listContexts(): Promise<IResultData<IContext[]>>;
  createProfile(context: string, profileInfo: IProfile): Promise<boolean>;
  removeProfile(context: string, profileAlias: string): Promise<boolean>;
  listProfiles(context: string): Promise<IProfile[]>;
}
