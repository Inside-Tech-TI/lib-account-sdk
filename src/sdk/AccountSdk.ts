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
  async updateUserInfoByAccountId(
    accountId: string,
    userDetails: IUserAccountDetails
  ): Promise<IResult> {
    return await this.axiosInstance.post(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/info/update`,
      userDetails
    );
  }
  async getContextUserInfo<T>(
    accountId: string
  ): Promise<IResultData<ContextUserInfo<T>>> {
    return await this.axiosInstance.get(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/info`
    );
  }
  async getUserTasks(
    accountId: string
  ): Promise<IResultData<UserInteractions>> {
    return await this.axiosInstance.get(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/tasks`
    );
  }
  async addUserTask(
    accountId: string,
    task: InteractionItem
  ): Promise<IResult> {
    return await this.axiosInstance.post(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/tasks/add`,
      task
    );
  }
  async checkUserTaskStatus(
    accountId: string,
    taskAlias: string
  ): Promise<IResultData<string | undefined>> {
    throw new Error("Method not implemented in account api.");
    // return await this.axiosInstance.get(
    //   `/api/${this.app}/context/${this.context}/user/${accountId}/data/tasks/status/${taskAlias}`
    // );
  }
  async updateUserTasks(
    accountId: string,
    tasks: UserInteractions
  ): Promise<IResult> {
    throw new Error("Method not implemented in account api.");
    // return await this.getAxiosUser(jwtToken).post(
    //   `/api/${this.app}/context/${this.context}/user/data/tasks/update`,
    //   tasks
    // );
  }
  async removeUserTask(jwtToken: string, taskAlias: string): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).delete(
      `/api/${this.app}/context/${this.context}/user/data/task/remove/${taskAlias}`
    );
  }
  async removeProfilePermission(
    accountId: string,
    profileAlias: string
  ): Promise<IResult> {
    return await this.axiosInstance.delete(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/profiles/remove/${profileAlias}`
    );
  }
  async updateProfilePermission(
    accountId: string,
    profiles: string[]
  ): Promise<IResult> {
    return await this.axiosInstance.post(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/profiles/update`,
      profiles
    );
  }
  async listProfiles(jwtToken: string): Promise<IResultData<string[]>> {
    return await this.getAxiosUser(jwtToken).get(
      `/api/${this.app}/context/${this.context}/user/data/profiles`
    );
  }
  async listAchievements(
    accountId: string
  ): Promise<IResultData<UserInteractions>> {
    return await this.axiosInstance.get(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/list`
    );
  }
  async addAchievement(
    accountId: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    return await this.axiosInstance.post(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/add`,
      achievement
    );
  }
  async updateAchievement(
    accountId: string,
    achievementAlias: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    return await this.axiosInstance.put(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/update/${achievementAlias}`,
      achievement
    );
  }
  async removeAchievement(
    accountId: string,
    achievementAlias: string
  ): Promise<IResult> {
    return await this.axiosInstance.delete(
      `/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/remove/${achievementAlias}`
    );
  }
  async toggleActive(accountId: string, active: boolean): Promise<IResult> {
    return await this.apiPost<IResult>(
      `/api/${this.app}/context/${this.context}/user/${accountId}/toggle-active`,
      { active }
    );
  }

  async rememberPassword(
    login: string
  ): Promise<IResultData<{ tokenToRenew: string }>> {
    return await this.apiPost<IResultData<{ tokenToRenew: string }>>(
      `/public/forgot-password`,
      { login }
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
    return await axiosUser.post("/auth/logout");
  }
  //done
  async checkToken(token: string): Promise<IResult> {
    const axiosUser = this.getAxiosUser(token);
    return await axiosUser.post(`/auth/check-token`);
  }
  async refreshToken(
    token: string
  ): Promise<IResultData<{ token: string; expiresIn: number }>> {
    const axiosUser = this.getAxiosUser(token);
    return await axiosUser.post(`/auth/refresh-token`);
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
    if (response.status === 200) {
      return response.data as T;
    }
    return response.data as T;
  }
}
