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
  updateUserInfoByAccountId(
    accountId: string,
    userDetails: IUserAccountDetails
  ): Promise<IResult> {
    throw new Error("Method not implemented.");
  }
  async getContextUserInfo<T>(
    jwtToken: string
  ): Promise<IResultData<ContextUserInfo<T>>> {
    return await this.getAxiosUser(jwtToken).get(
      `/api/${this.app}/context/${this.context}/user/data/info`
    );
  }
  async getUserTasks(jwtToken: string): Promise<IResultData<UserInteractions>> {
    return await this.getAxiosUser(jwtToken).get(
      `/api/${this.app}/context/${this.context}/user/data/tasks`
    );
  }
  async addUserTask(jwtToken: string, task: InteractionItem): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).post(
      `/api/${this.app}/context/${this.context}/user/data/tasks/add`,
      task
    );
  }
  async checkUserTaskStatus(
    jwtToken: string,
    taskAlias: string
  ): Promise<IResultData<string | undefined>> {
    return await this.getAxiosUser(jwtToken).get(
      `/api/${this.app}/context/${this.context}/user/data/tasks/status/${taskAlias}`
    );
  }
  async updateUserTasks(
    jwtToken: string,
    tasks: UserInteractions
  ): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).post(
      `/api/${this.app}/context/${this.context}/user/data/tasks/update`,
      tasks
    );
  }
  async removeUserTask(jwtToken: string, taskAlias: string): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).delete(
      `/api/${this.app}/context/${this.context}/user/data/task/remove/${taskAlias}`
    );
  }
  async removeProfilePermission(
    jwtToken: string,
    profileAlias: string
  ): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).delete(
      `/api/${this.app}/context/${this.context}/user/data/profiles/remove/${profileAlias}`
    );
  }
  async updateProfilePermission(
    jwtToken: string,
    profiles: string[]
  ): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).post(
      `/api/${this.app}/context/${this.context}/user/data/profiles/update`,
      profiles
    );
  }
  async listProfiles(jwtToken: string): Promise<IResultData<string[]>> {
    return await this.getAxiosUser(jwtToken).get(
      `/api/${this.app}/context/${this.context}/user/data/profiles`
    );
  }
  async listAchievements(
    jwtToken: string
  ): Promise<IResultData<UserInteractions>> {
    return await this.getAxiosUser(jwtToken).get(
      `/api/${this.app}/context/${this.context}/user/data/achievements`
    );
  }
  async addAchievement(
    jwtToken: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).post(
      `/api/${this.app}/context/${this.context}/user/data/achievements/add`,
      achievement
    );
  }
  async updateAchievement(
    jwtToken: string,
    achievementAlias: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).put(
      `/api/${this.app}/context/${this.context}/user/data/achievements/update/${achievementAlias}`,
      achievement
    );
  }
  async removeAchievement(
    jwtToken: string,
    achievementAlias: string
  ): Promise<IResult> {
    return await this.getAxiosUser(jwtToken).delete(
      `/api/${this.app}/context/${this.context}/user/data/achievements/remove/${achievementAlias}`
    );
  }
  async toggleActive(accountId: string, active: boolean): Promise<IResult> {
    return await this.axiosInstance.post(
      `/api/${this.app}/context/${this.context}/user/${accountId}/toggle-active`,
      { active }
    );
  }

  async rememberPassword(
    login: string
  ): Promise<IResultData<{ tokenToRenew: string }>> {
    return await this.axiosInstance.post(`/public/forgot-password`, { login });
  }
  async resetPasswordFromToken(
    login: string,
    tokenToRenew: string,
    newPassword: string
  ): Promise<IResult> {
    return this.axiosInstance.post(`/public/reset-password`, {
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
    return await this.axiosInstance.post("/public/signin/password", {
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
    userInContext: ContextUserInfo<any>
  ): Promise<IResultData<{ id: string }>> {
    return await this.axiosInstance.post(
      `/api/${this.app}/context/${this.context}/user-credentials/create`,
      { credentials, userInContext }
    );
  }
}
