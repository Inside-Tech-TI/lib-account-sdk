import { IResultData, IResult } from "../interface/types";
import {
  ContextUserInfo,
  UserInteractions,
  InteractionItem,
} from "../interface/sdk/IUser";
import { IUserContextSdk } from "../interface/user/IUserContextSdk";
import { BaseSdk } from "./BaseSdk";

export const userContextPaths = {
  contextInfo: "/user/:accountId/data/info",
  updateContextInfo: "/user/:accountId/context/info/update",
  updateUserTasks: "/user/:accountId/tasks/update",
  removeUserTask: "/user/:accountId/tasks/remove",
  listProfiles: "/user/:accountId/data/profiles/list",
  removeProfilePermission: "/user/:accountId/data/profiles/remove",
  updateProfilePermission: "/user/:accountId/data/profiles/update",
  listAchievements: "/user/:accountId/data/achievements/list",
  addAchievement: "/user/:accountId/data/achievements/add",
  updateAchievement: "/user/:accountId/data/achievements/update",
  removeAchievement: "/user/:accountId/data/achievements/remove",
  toggleActive: "/user/:accountId/toggle-active",
};

export class UserContextSdk extends BaseSdk implements IUserContextSdk {
  async getContextUserInfo<T>(
    accountId: string
  ): Promise<IResultData<ContextUserInfo<T>>> {
    const result = await this.axiosInstance.get(
      this.endpoint + userContextPaths.contextInfo,
      {
        headers: {
          Authorization: `Bearer ${accountId}`,
        },
      }
    );
    return result.data;
  }
  async updateUserInfo<T>(
    accountId: string,
    userAccountInfo: T
  ): Promise<IResult> {
    const result = await this.axiosInstance.post(
      this.endpoint + userContextPaths.updateContextInfo,
      userAccountInfo
    );
    return result.data;
  }
  async updateUserTasks(
    accountId: string,
    tasks: UserInteractions
  ): Promise<IResult> {
    const result = await this.axiosInstance.post(
      this.endpoint +
        userContextPaths.updateUserTasks.replace(":accountId", accountId),
      tasks
    );
    return result.data;
  }
  async removeUserTask(accountId: string, taskAlias: string): Promise<IResult> {
    const result = await this.axiosInstance.delete(
      this.endpoint +
        userContextPaths.removeUserTask.replace(":accountId", accountId),
      {
        data: { taskAlias },
      }
    );
    return result.data;
  }
  async removeProfilePermission(
    accountId: string,
    profileAlias: string
  ): Promise<IResult> {
    const result = await this.axiosInstance.delete(
      this.endpoint +
        userContextPaths.removeProfilePermission.replace(
          ":accountId",
          accountId
        ),
      {
        data: { profileAlias },
      }
    );
    return result.data;
  }
  async updateProfilePermission(
    accountId: string,
    profiles: string[]
  ): Promise<IResult> {
    const result = await this.axiosInstance.post(
      this.endpoint +
        userContextPaths.updateProfilePermission.replace(
          ":accountId",
          accountId
        ),
      profiles
    );
    return result.data;
  }
  async listAchievements(
    accountId: string
  ): Promise<IResultData<UserInteractions>> {
    const result = await this.axiosInstance.get(
      this.endpoint +
        userContextPaths.listAchievements.replace(":accountId", accountId)
    );
    return result.data;
  }
  async addAchievement(
    accountId: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    const result = await this.axiosInstance.post(
      this.endpoint +
        userContextPaths.addAchievement.replace(":accountId", accountId),
      achievement
    );
    return result.data;
  }
  async updateAchievement(
    accountId: string,
    achievement: InteractionItem
  ): Promise<IResult> {
    const result = await this.axiosInstance.post(
      this.endpoint +
        userContextPaths.updateAchievement.replace(":accountId", accountId),
      achievement
    );
    return result.data;
  }
  async removeAchievement(
    accountId: string,
    achievementAlias: string
  ): Promise<IResult> {
    const result = await this.axiosInstance.delete(
      this.endpoint +
        userContextPaths.removeAchievement.replace(":accountId", accountId),
      {
        data: { alias: achievementAlias },
      }
    );
    return result.data;
  }
  async toggleActive(accountId: string, active: boolean): Promise<IResult> {
    const result = await this.axiosInstance.put(
      this.endpoint +
        userContextPaths.toggleActive.replace(":accountId", accountId),
      { active }
    );
    return result.data;
  }
}
