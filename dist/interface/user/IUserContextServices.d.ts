import { IResult, IResultData } from "../types";
import { ContextUserInfo, InteractionItem, UserInteractions } from "../sdk/IUser";
export interface IUserContextServices {
    getContextUserInfo<T>(userAccountId: string): Promise<IResultData<ContextUserInfo<T>>>;
    updateUserInfo<T>(userAccountId: string, userAccountInfo: T): Promise<IResult>;
    addUserTask(userAccountId: string, task: InteractionItem): Promise<IResult>;
    checkUserTaskStatus(userAccountId: string, taskAlias: string): Promise<IResultData<string | undefined>>;
    updateUserTasks(userAccountId: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(userAccountId: string, taskAlias: string): Promise<IResult>;
    listUserTasks(userAccountId: string): Promise<IResultData<UserInteractions>>;
    removeProfilePermission(userAccountId: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(userAccountId: string, profiles: string[]): Promise<IResult>;
    listProfiles(userAccountId: string): Promise<IResultData<string[]>>;
    listAchievements(userAccountId: string): Promise<IResultData<UserInteractions>>;
    addAchievement(userAccountId: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(userAccountId: string, achievementAlias: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(userAccountId: string, achievementAlias: string): Promise<IResult>;
    toggleActive(userAccountId: string, active: boolean): Promise<IResult>;
}
