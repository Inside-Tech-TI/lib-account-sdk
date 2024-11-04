import { IAppSdk } from "../../interface/application/IAppSdk";

import {
  IContext,
  IResult,
  IResultData,
  IProfile,
} from "../../interface/types";

export class AppMockSdk implements IAppSdk {
  private contexts: Map<string, IContext> = new Map();
  constructor(protected app: string, protected context: string) {}
  async createContext(contextInfo: IContext): Promise<IResult> {
    this.contexts.set(contextInfo.id, contextInfo);
    return { success: true };
  }
  async removeContext(context: string): Promise<IResult> {
    if (!this.contexts.has(context)) return { success: false };
    this.contexts.delete(context);
    return { success: true };
  }
  async toggleActiveContext(
    context: string,
    active: boolean
  ): Promise<IResult> {
    if (!this.contexts.has(context)) return { success: false };
    const contextInfo = this.contexts.get(context);
    if (contextInfo) {
      contextInfo.active = active;
    }
    return { success: true };
  }
  async getContext(context: string): Promise<IContext> {
    if (!this.contexts.has(context)) {
      throw new Error("Context not found");
    }
    return this.contexts.get(context) as IContext;
  }
  async listContexts(): Promise<IResultData<IContext[]>> {
    return {
      data: Array.from(this.contexts.values()),
      success: true,
    };
  }
  async createProfile(
    context: string,
    profileInfo: IProfile
  ): Promise<boolean> {
    if (!context) return false;
    const contextInfo = await this.getContext(context);
    if (!contextInfo) return false;
    if (!contextInfo.profiles) contextInfo.profiles = {};
    contextInfo.profiles[profileInfo.id] = profileInfo;
    return true;
  }
  async removeProfile(context: string, profileAlias: string): Promise<boolean> {
    if (!context) return false;
    const contextInfo = await this.getContext(context);
    if (!contextInfo) return false;
    if (!contextInfo.profiles) return false;
    delete contextInfo.profiles[profileAlias];
    return true;
  }
  async listProfiles(context: string): Promise<IProfile[]> {
    if (!context) return [];
    const contextInfo = await this.getContext(context);
    if (!contextInfo) return [];
    return Object.values(contextInfo.profiles) || [];
  }
}
