import { IResultData, IResult } from "../interface/types";
import {
  ContextUserInfo,
  UserInteractions,
  InteractionItem,
} from "../interface/sdk/IUser";
import { IUserContextSdk } from "../interface/user/IUserContextSdk";
import { BaseSdk } from "./BaseSdk";

export const userContextPaths = {
  contextInfo: "/data/info",
  updateContextInfo: "/data/info/update",
  getUserTasks: "/data/tasks",
  addUserTasks: "/data/tasks/add",
  checkUserTaskStatus: "/data/tasks/status/:taskAlias",
  updateUserTasks: "/tasks/update",
  removeUserTask: "/tasks/remove",
  listProfiles: "/data/profiles/list",
  removeProfilePermission: "/data/profiles/remove/:profileAlias",
  updateProfilePermission: "/data/profiles/update/",
  listAchievements: "/data/achievements",
  addAchievement: "/data/achievements/add",
  updateAchievement: "/data/achievements/update/:achievementAlias",
  removeAchievement: "/data/achievements/remove/:achievementAlias",
  toggleActive: "/toggle-active",
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
  async listUserTasks(
    accountId: string
  ): Promise<IResultData<UserInteractions>> {
    const result = await this.axiosInstance.get(
      this.endpoint +
        userContextPaths.listProfiles.replace(":accountId", accountId)
    );
    return result.data;
  }
  async updateUserInfo<T>(
    accountId: string,
    userAccountInfo: T
  ): Promise<IResult> {
    const result = await this.axiosInstance.post(
      this.endpoint +
        userContextPaths.updateContextInfo.replace(":accountId", accountId),
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
