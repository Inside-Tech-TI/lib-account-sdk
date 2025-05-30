import { IAccountSDK } from "../interface/sdk/IAccountSDK";
import { BaseSdk } from "./BaseSdk";
import { IResultData, IResult } from "../interface/sdk/types";
import {
  ContextUserInfo,
  InteractionItem,
  IUserAccountDetails,
  IUserCredentials,
  UserInteractions,
} from "../interface/sdk/IUser";
import { userContextPaths } from "./UserContextSdk";

// TODO: Testar
export class AccountSdk extends BaseSdk implements IAccountSDK {
  constructor(
    protected app: string,
    protected context: string,
    endpoint: string,
    apiToken: string
  ) {
    super(endpoint, apiToken);
  }
  updateUserInfoByToken<T>(
    jwtToken: string,
    userAccountInfo: T
  ): Promise<IResult> {
    throw new Error("Method not implemented.");
  }
  private getUserAccountPath(accountId: string): string {
    return `/api/${this.app}/context/${this.context}/user/${accountId}`;
  }
  async updateUserInfoByAccountId(
    accountId: string,
    userDetails: IUserAccountDetails
  ): Promise<IResult> {
    return (
      await this.axiosInstance.post(
        `${this.getUserAccountPath(accountId)}${
          userContextPaths.updateContextInfo
        }`,
        userDetails
      )
    ).data;
  }
  async getContextUserInfo<T>(
    accountId: string
  ): Promise<IResultData<ContextUserInfo<T>>> {
    return (
      await this.axiosInstance.get(
        `${this.getUserAccountPath(accountId)}${userContextPaths.contextInfo}`
      )
    ).data;
  }
  async getUserTasks(
    accountId: string
  ): Promise<IResultData<UserInteractions>> {
    return (
      await this.axiosInstance.get(
        `${this.getUserAccountPath(accountId)}${userContextPaths.getUserTasks}`
      )
    ).data;
  }
  async addUserTask(
    accountId: string,
    task: InteractionItem
  ): Promise<IResult> {
    return (
      await this.axiosInstance.post(
        `${this.getUserAccountPath(accountId)}${userContextPaths.addUserTasks}`,
        task
      )
    ).data;
  }
  async checkUserTaskStatus(
    accountId: string,
    taskAlias: string
  ): Promise<IResultData<string | undefined>> {
    return await this.axiosInstance.get(
      `${this.getUserAccountPath(
        accountId
      )}${userContextPaths.checkUserTaskStatus.replace(
        ":taskAlias",
        taskAlias
      )})`
    );
  }
  async updateUserTasks(
    accountId: string,
    tasks: UserInteractions
  ): Promise<IResult> {
    return await this.axiosInstance.post(
      `${this.getUserAccountPath(accountId)}${
        userContextPaths.updateUserTasks
      }`,
      tasks
    );
  }
  async removeUserTask(accountId: string, taskAlias: string): Promise<IResult> {
    return (
      await this.axiosInstance.delete(
        `${this.getUserAccountPath(
          accountId
        )}${userContextPaths.removeUserTask.replace(":taskAlias", taskAlias)}`
      )
    ).data;
  }
  async removeProfilePermission(
    accountId: string,
    profileAlias: string
  ): Promise<IResult> {
    return (
      await this.axiosInstance.delete(
        `${this.getUserAccountPath(
          accountId
        )}${userContextPaths.removeProfilePermission.replace(
          ":profileAlias",
          profileAlias
        )}`
      )
    ).data;
  }
  async updateProfilePermission(
    accountId: string,
    profiles: string[]
  ): Promise<IResult> {
    return (
      await this.axiosInstance.post(
        `${this.getUserAccountPath(accountId)}${
          userContextPaths.updateProfilePermission
        }`,
        profiles
      )
    ).data;
  }
  async listProfiles(accountId: string): Promise<IResultData<string[]>> {
    return (
      await this.axiosInstance.get(
        `${this.getUserAccountPath(accountId)}${userContextPaths.listProfiles}`
      )
    ).data;
  }
  async listAchievements(
    accountId: string
  ): Promise<IResultData<UserInteractions>> {
    return (
      await this.axiosInstance.get(
        `${this.getUserAccountPath(accountId)}${
          userContextPaths.listAchievements
        }`
      )
    ).data;
  }
  async addAchievement(
    accountId: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    return (
      await this.axiosInstance.post(
        `${this.getUserAccountPath(accountId)}${
          userContextPaths.addAchievement
        }`,
        achievement
      )
    ).data;
  }
  async updateAchievement(
    accountId: string,
    achievementAlias: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    return (
      await this.axiosInstance.put(
        `${this.getUserAccountPath(
          accountId
        )}${userContextPaths.updateAchievement.replace(
          ":achievementAlias",
          achievementAlias
        )}`,
        achievement
      )
    ).data;
  }
  async removeAchievement(
    accountId: string,
    achievementAlias: string
  ): Promise<IResult> {
    return (
      await this.axiosInstance.delete(
        `${this.getUserAccountPath(
          accountId
        )}${userContextPaths.removeAchievement.replace(
          ":achievementAlias",
          achievementAlias
        )}`
      )
    ).data;
  }
  async toggleActive(accountId: string, active: boolean): Promise<IResult> {
    return await this.apiPost<IResult>(
      `${this.getUserAccountPath(accountId)}${userContextPaths.toggleActive}`,
      { active }
    );
  }

  async rememberPassword(
    login: string,
    timeoutInSeconds: number = 180
  ): Promise<IResultData<{ tokenToRenew: string }>> {
    return await this.apiPost<IResultData<{ tokenToRenew: string }>>(
      `/public/forgot-password`,
      { login, timeoutInSeconds }
    );
  }
  async resetPasswordFromToken(
    login: string,
    tokenToRenew: string,
    newPassword: string
  ): Promise<IResult> {
    return await this.apiPost<IResult>(`/public/reset-password`, {
      login,
      tokenToRenew,
      newPassword,
    });
  }
  async signIn<T>(
    login: string,
    password: string
  ): Promise<
    IResultData<{
      token: string;
      expiresIn: number;
      userInfo: ContextUserInfo<T>;
    }>
  > {
    return await this.apiPost<
      IResultData<{
        token: string;
        expiresIn: number;
        userInfo: ContextUserInfo<T>;
      }>
    >("/public/signin/password", {
      password,
      login,
      app: this.app,
      context: this.context,
    });
  }
  async signOut(token: string): Promise<IResult> {
    const axiosUser = this.getAxiosUser(token);
    return (await axiosUser.post("/auth/logout")).data as IResult;
  }
  //done
  async checkToken(token: string): Promise<IResult> {
    const axiosUser = this.getAxiosUser(token);
    return (await axiosUser.post(`/auth/check-token`)).data as IResult;
  }
  async refreshToken(
    token: string
  ): Promise<IResultData<{ token: string; expiresIn: number }>> {
    const axiosUser = this.getAxiosUser(token);
    return (await axiosUser.post(`/auth/refresh-token`)).data;
  }
  async createCredentials(
    credentials: IUserCredentials,
    userInContext: ContextUserInfo<any>,
    userDetails: any = {}
  ): Promise<IResultData<{ id: string }>> {
    return await this.apiPost<IResultData<{ id: string }>>(
      `/api/${this.app}/context/${this.context}/user-credentials/create`,
      { credentials, userDetails, userInContext }
    );
  }
  private async apiPost<T>(endpoint: string, data: any): Promise<T> {
    const response = await this.axiosInstance.post(endpoint, data);
    return response.data as T;
  }
}
