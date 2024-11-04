import e from "express";
import { HttpError } from "../../interface/errors";
import { IAccountSDK } from "../../interface/sdk/IAccountSDK";
import {
  ContextUserInfo,
  InteractionItem,
  IUserAccountDetails,
  IUserCredentials,
  UserInteractions,
} from "../../interface/sdk/IUser";
import { IResultData, IResult } from "../../interface/sdk/types";

import { AppMockSdk } from "./AppMockSdk";

export class AccountMockSdk implements IAccountSDK {
  private tokenToRenew: Map<string, string> = new Map();
  private createTokenToLogin(login: string): string {
    const token = `mock-token-${new Date().getTime() + 300000}`;
    this.tokenToRenew.set(token, login);
    setTimeout(() => {
      this.tokenToRenew.delete(token);
    }, 3600);
    return token;
  }
  private users: Map<
    string,
    { password: string; context: ContextUserInfo<any> }
  > = new Map();
  private loggedUsers: Map<string, ContextUserInfo<any>> = new Map();
  private appMock: AppMockSdk;
  constructor(protected app: string, protected context: string) {
    this.appMock = new AppMockSdk(app, context);
  }

  private getContextByToken<T>(token: string): ContextUserInfo<T> {
    if (this.loggedUsers.has(token)) {
      return this.loggedUsers.get(token) as ContextUserInfo<T>;
    }
    throw new HttpError(403, "invalid token");
  }
  async getContextUserInfo<T>(jwtToken: string): Promise<IResultData<T>> {
    return { success: true, data: this.getContextByToken(jwtToken).info as T };
  }
  async listUserTasks(
    jwtToken: string
  ): Promise<IResultData<UserInteractions>> {
    const user = this.getContextByToken(jwtToken);
    return { success: true, data: user.tasks };
  }
  async addUserTask(jwtToken: string, task: InteractionItem): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    if (!user.tasks) {
      user.tasks = {};
    }
    user.tasks[task.alias] = task;
    return { success: true };
  }
  async checkUserTaskStatus(
    jwtToken: string,
    taskAlias: string
  ): Promise<IResultData<string | undefined>> {
    const user = this.getContextByToken(jwtToken);
    if (!user.tasks) {
      return { success: true, data: undefined };
    }
    return {
      success: true,
      data: user.tasks[taskAlias]?.status,
    };
  }
  async updateUserTasks(
    jwtToken: string,
    tasks: UserInteractions
  ): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);

    user.tasks = tasks;
    return { success: true };
  }
  async removeUserTask(jwtToken: string, taskAlias: string): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    if (!user.tasks) {
      return { success: true };
    }
    delete user.tasks[taskAlias];
    return { success: true };
  }
  async listProfiles(jwtToken: string): Promise<IResultData<string[]>> {
    const user = this.getContextByToken(jwtToken);
    return { success: true, data: user.profiles || [] };
  }
  async removeProfilePermission(
    jwtToken: string,
    profileAlias: string
  ): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    if (!user.profiles) {
      return { success: true };
    }
    const indexOfProfile = user.profiles.indexOf(profileAlias);
    if (indexOfProfile < 0) {
      return { success: true };
    }
    user.profiles.splice(indexOfProfile, 1);
    return { success: true };
  }
  async updateProfilePermission(
    jwtToken: string,
    profiles: string[]
  ): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    const existedProfiles = await this.appMock.listProfiles(this.context);
    if (!Array.isArray(existedProfiles)) {
      return {
        success: false,
        messages: ["Account Error: Não há profiles em seu app/context."],
      };
    }
    if (!user.profiles) {
      user.profiles = [];
    }
    existedProfiles.forEach((profile) => {
      if (!profiles.includes(profile.id)) {
        throw new HttpError(400, `Profile ${profile} não existe`);
      }
      if (!user.profiles.includes(profile.id)) {
        user.profiles.push(profile.id);
      }
    });
    return { success: true };
  }
  async listAchievements(
    jwtToken: string
  ): Promise<IResultData<UserInteractions>> {
    const user = this.getContextByToken(jwtToken);
    return { success: true, data: user.achievements };
  }
  async addAchievement(
    jwtToken: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    if (!user.achievements) {
      user.achievements = {};
    }
    user.achievements[achievement.alias] = achievement;
    return { success: true };
  }
  async updateAchievement(
    jwtToken: string,
    achievementAlias: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    if (!user.achievements) {
      return { success: true };
    }
    user.achievements[achievementAlias] = achievement;
    return { success: true };
  }
  async removeAchievement(
    jwtToken: string,
    achievementAlias: string
  ): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    if (!user.achievements) {
      return { success: true };
    }
    delete user.achievements[achievementAlias];
    return { success: true };
  }
  async toggleActive(jwtToken: string, active: boolean): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    user.active = active;
    return { success: true };
  }
  async updateUserInfoByToken<T>(
    jwtToken: string,
    userAccountInfo: T
  ): Promise<IResult> {
    const user = this.getContextByToken(jwtToken);
    user.info = userAccountInfo;
    return { success: true };
  }
  async updateUserInfoByAccountId(
    accountId: string,
    userDetails: IUserAccountDetails
  ): Promise<IResult> {
    const user = this.users.get(accountId);
    if (!user) {
      return { success: false, messages: ["Usuário não encontrado"] };
    }
    user.context.info = userDetails;
    return { success: true };
  }
  async rememberPassword(
    login: string
  ): Promise<IResultData<{ tokenToRenew: string }>> {
    const user = this.users.get(login);
    if (!user) {
      return { success: false, messages: ["Usuário não encontrado"] };
    }
    const token = this.createTokenToLogin(login);
    return { success: true, data: { tokenToRenew: token } };
  }
  async resetPasswordFromToken(
    login: string,
    tokenToRenew: string,
    newPassword: string
  ): Promise<IResult> {
    if (!this.tokenToRenew.has(tokenToRenew)) {
      return { success: false, messages: ["Token inválido"] };
    }
    if (this.tokenToRenew.get(tokenToRenew) !== login) {
      return { success: false, messages: ["Token inválido"] };
    }
    const user = this.users.get(login);
    if (!user) {
      return { success: false, messages: ["Usuário não encontrado"] };
    }
    user.password = newPassword;
    return { success: true };
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
    const user = this.users.get(login);
    if (!user) {
      return { success: false, messages: ["Usuário não encontrado"] };
    }
    if (user.password !== password) {
      return { success: false, messages: ["Senha inválida"] };
    }
    const token = `${login}-${new Date().getTime() + 300000}`;
    this.loggedUsers.set(token, user.context);
    return {
      success: true,
      data: {
        token,
        expiresIn: 300,
        userInfo: user.context,
      },
    };
  }
  async checkToken(token: string): Promise<IResult> {
    if (this.loggedUsers.has(token)) {
      return { success: true };
    }
    return { success: false, messages: ["invalid token"] };
  }
  async refreshToken(
    token: string
  ): Promise<IResultData<{ token: string; expiresIn: number }>> {
    if (!this.loggedUsers.has(token)) {
      return { success: false, messages: ["invalid token"] };
    }
    const user = this.loggedUsers.get(token);
    //check timeout
    const time = new Date(parseInt(token.split("-")[1]));
    if (time < new Date()) {
      //expirado
      return { success: false, messages: ["token expired"] };
    }
    //create a new date to 5 minutes from now
    const newTime = new Date();
    newTime.setMinutes(newTime.getMinutes() + 5);
    const newToken = `${token.split("-")[0]}-${newTime.getTime()}`;
    return { success: true, data: { token: newToken, expiresIn: 300 } };
  }
  async createCredentials(
    credentials: IUserCredentials,
    userInContext: ContextUserInfo<any>
  ): Promise<IResult> {
    const user = this.users.get(credentials.login);
    if (user) {
      user.context = userInContext;
      return {
        success: true,
        messages: ["Usuário já existia, atualizado os contextos"],
      };
    }
    const key: string = `${credentials.login}`;
    this.users.set(key, {
      password: credentials.password,
      context: userInContext,
    });
    return { success: true, messages: ["Usuário criado com sucesso"] };
  }

  async signOut(token: string): Promise<IResult> {
    this.loggedUsers.delete(token);
    return { success: true };
  }
}
