import { IResult, IResultData } from "../types";
import { ContextUserInfo, InteractionItem, UserInteractions } from "../sdk/IUser";
export interface IUserContextSdk {
    getContextUserInfo<T>(token: string): Promise<IResultData<ContextUserInfo<T>>>;
    updateUserInfo<T>(token: string, userAccountInfo: T): Promise<IResult>;
    updateUserTasks(token: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(token: string, taskAlias: string): Promise<IResult>;
    removeProfilePermission(token: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(token: string, profiles: string[]): Promise<IResult>;
    listAchievements(token: string): Promise<IResultData<UserInteractions>>;
    addAchievement(token: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(token: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(token: string, achievementAlias: string): Promise<IResult>;
    toggleActive(token: string, active: boolean): Promise<IResult>;
}
