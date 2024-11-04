import { IResultData, IResult } from "../interface/types";
import {
  ContextUserInfo,
  UserInteractions,
  InteractionItem,
} from "../interface/sdk/IUser";
import { IUserContextSdk } from "../interface/user/IUserContextSdk";
import { BaseSdk } from "./BaseSdk";

export const userContextPaths = {
  contextInfo: "/user/context/info/get",
  updateContextInfo: "/user/context/info/update",
  updateUserTasks: "/user/tasks/update",
  removeUserTask: "/user/tasks/remove",
  removeProfilePermission: "/user/profiles/remove",
  updateProfilePermission: "/user/profiles/update",
  listAchievements: "/user/achievements/list",
  addAchievement: "/user/achievements/add",
  updateAchievement: "/user/achievements/update",
  removeAchievement: "/user/achievements/remove",
  toggleActive: "/user/active",
};

export class UserContextSdk extends BaseSdk implements IUserContextSdk {
  async getContextUserInfo<T>(
    token: string
  ): Promise<IResultData<ContextUserInfo<T>>> {
    const result = await this.axiosInstance.get(
      this.endpoint + userContextPaths.contextInfo,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }
  async updateUserInfo<T>(token: string, userAccountInfo: T): Promise<IResult> {
    const result = await this.getAxiosUser(token).post(
      this.endpoint + userContextPaths.updateContextInfo,
      userAccountInfo
    );
    return result.data;
  }
  async updateUserTasks(
    token: string,
    tasks: UserInteractions
  ): Promise<IResult> {
    const result = await this.getAxiosUser(token).post(
      this.endpoint + userContextPaths.updateUserTasks,
      tasks
    );
    return result.data;
  }
  async removeUserTask(token: string, taskAlias: string): Promise<IResult> {
    const result = await this.getAxiosUser(token).delete(
      this.endpoint + userContextPaths.removeUserTask,
      {
        data: { taskAlias },
      }
    );
    return result.data;
  }
  async removeProfilePermission(
    token: string,
    profileAlias: string
  ): Promise<IResult> {
    const result = await this.getAxiosUser(token).delete(
      this.endpoint + userContextPaths.removeProfilePermission,
      {
        data: { profileAlias },
      }
    );
    return result.data;
  }
  async updateProfilePermission(
    token: string,
    profiles: string[]
  ): Promise<IResult> {
    const result = await this.getAxiosUser(token).post(
      this.endpoint + userContextPaths.updateProfilePermission,
      profiles
    );
    return result.data;
  }
  async listAchievements(
    token: string
  ): Promise<IResultData<UserInteractions>> {
    const result = await this.getAxiosUser(token).get(
      this.endpoint + userContextPaths.listAchievements
    );
    return result.data;
  }
  async addAchievement(
    token: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    const result = await this.getAxiosUser(token).post(
      this.endpoint + userContextPaths.addAchievement,
      achievement
    );
    return result.data;
  }
  async updateAchievement(
    token: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    const result = await this.getAxiosUser(token).post(
      this.endpoint + userContextPaths.updateAchievement,
      achievement
    );
    return result.data;
  }
  async removeAchievement(
    token: string,
    achievementAlias: string
  ): Promise<IResult> {
    const result = await this.getAxiosUser(token).delete(
      this.endpoint + userContextPaths.removeAchievement,
      {
        data: { alias: achievementAlias },
      }
    );
    return result.data;
  }
  async toggleActive(token: string, active: boolean): Promise<IResult> {
    const result = await this.getAxiosUser(token).put(
      this.endpoint + userContextPaths.toggleActive,
      { active }
    );
    return result.data;
  }
}
