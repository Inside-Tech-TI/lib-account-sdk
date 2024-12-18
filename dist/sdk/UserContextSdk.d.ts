import { IResultData, IResult } from "../interface/types";
import { ContextUserInfo, UserInteractions, InteractionItem } from "../interface/sdk/IUser";
import { IUserContextSdk } from "../interface/user/IUserContextSdk";
import { BaseSdk } from "./BaseSdk";
export declare const userContextPaths: {
    contextInfo: string;
    updateContextInfo: string;
    addUserTasks: string;
    updateUserTasks: string;
    removeUserTask: string;
    listProfiles: string;
    removeProfilePermission: string;
    updateProfilePermission: string;
    listAchievements: string;
    addAchievement: string;
    updateAchievement: string;
    removeAchievement: string;
    toggleActive: string;
};
export declare class UserContextSdk extends BaseSdk implements IUserContextSdk {
    getContextUserInfo<T>(accountId: string): Promise<IResultData<ContextUserInfo<T>>>;
    listUserTasks(accountId: string): Promise<IResultData<UserInteractions>>;
    updateUserInfo<T>(accountId: string, userAccountInfo: T): Promise<IResult>;
    updateUserTasks(accountId: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(accountId: string, taskAlias: string): Promise<IResult>;
    removeProfilePermission(accountId: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(accountId: string, profiles: string[]): Promise<IResult>;
    listAchievements(accountId: string): Promise<IResultData<UserInteractions>>;
    addAchievement(accountId: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(accountId: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(accountId: string, achievementAlias: string): Promise<IResult>;
    toggleActive(accountId: string, active: boolean): Promise<IResult>;
}
