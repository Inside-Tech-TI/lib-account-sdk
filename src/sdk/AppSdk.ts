import { IAppSdk } from "../interface/application/IAppSdk";
import { IContext, IResult, IResultData, IProfile } from "../interface/types";
import { BaseSdk } from "./BaseSdk";

//TODO: Todos os paths estão errados em relação a pasta mockup/ e ao arquivo api.routes.ts
// [ ] Corrigir os paths aqui nesse arquivo para condizer com o api.routes.ts
// [ ] Corrigir os paths e endpoints no arquivo api.routes.ts pois esses paths devem alterar nível de app e não de usuário
// [ ] Corrigir o mockup/ para condizer com a realidade desejada lembrando sempre que existe o nível de app e o nível de usuário, ex: criar profile em um usuário é diferente de criar num app
export const appPaths = {
  contextInfo: "/context/info/get",
  createContext: "/context/create",
  removeContext: "/context/remove",
  toggleActiveContext: "/context/active",
  listContexts: "/context/list",
  createProfile: "/profile/create",
  removeProfile: "/profile/remove",
  listProfiles: "/profile/list",
};

export class AppSdk extends BaseSdk implements IAppSdk {
  async createContext(contextInfo: IContext): Promise<IResult> {
    const result = await this.axiosInstance.post(
      this.endpoint + appPaths.createContext,
      contextInfo
    );
    return result.data;
  }

  async removeContext(context: string): Promise<IResult> {
    const result = await this.axiosInstance.delete(
      this.endpoint + appPaths.removeContext,
      {
        data: { context },
      }
    );
    return result.data;
  }

  async toggleActiveContext(
    context: string,
    active: boolean
  ): Promise<IResult> {
    const result = await this.axiosInstance.put(
      this.endpoint + appPaths.toggleActiveContext,
      { context, active }
    );
    return result.data;
  }

  async getContext(context: string): Promise<IContext> {
    const result = await this.axiosInstance.get(
      this.endpoint + appPaths.contextInfo,
      {
        params: { context },
      }
    );
    return result.data;
  }

  async listContexts(): Promise<IResultData<IContext[]>> {
    const result = await this.axiosInstance.get(
      this.endpoint + appPaths.listContexts
    );
    return result.data;
  }

  async createProfile(
    context: string,
    profileInfo: IProfile
  ): Promise<boolean> {
    const result = await this.axiosInstance.post(
      this.endpoint + appPaths.createProfile,
      { context, profile: profileInfo }
    );
    return result.data;
  }

  async removeProfile(context: string, profileAlias: string): Promise<boolean> {
    const result = await this.axiosInstance.delete(
      this.endpoint + appPaths.removeProfile,
      {
        data: { profileAlias, context },
      }
    );
    return result.data;
  }

  async listProfiles(context: string): Promise<IProfile[]> {
    const result = await this.axiosInstance.get(
      this.endpoint + appPaths.listProfiles,
      {
        params: { context },
      }
    );
    return result.data;
  }
}
