import { IResult, IResultData } from "../types";
import {
  ContextUserInfo,
  InteractionItem,
  UserInteractions,
} from "../sdk/IUser";

export interface IUserContextSdk {
  getContextUserInfo<T>(
    accountId: string
  ): Promise<IResultData<ContextUserInfo<T>>>;
  updateUserInfo<T>(accountId: string, userAccountInfo: T): Promise<IResult>;

  updateUserTasks(accountId: string, tasks: UserInteractions): Promise<IResult>;
  removeUserTask(accountId: string, taskAlias: string): Promise<IResult>;

  removeProfilePermission(
    accountId: string,
    profileAlias: string
  ): Promise<IResult>;
  updateProfilePermission(
    accountId: string,
    profiles: string[]
  ): Promise<IResult>;

  listAchievements(accountId: string): Promise<IResultData<UserInteractions>>;
  addAchievement(
    accountId: string,
    achievement: InteractionItem
  ): Promise<IResult>;
  updateAchievement(
    accountId: string,
    achievement: InteractionItem
  ): Promise<IResult>;
  removeAchievement(
    accountId: string,
    achievementAlias: string
  ): Promise<IResult>;
  toggleActive(accountId: string, active: boolean): Promise<IResult>;
}
