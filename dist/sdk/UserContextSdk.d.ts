import { IResultData, IResult } from "../interface/types";
import { ContextUserInfo, UserInteractions, InteractionItem } from "../interface/sdk/IUser";
import { IUserContextSdk } from "../interface/user/IUserContextSdk";
import { BaseSdk } from "./BaseSdk";
export declare const userContextPaths: {
    contextInfo: string;
    updateContextInfo: string;
    updateUserTasks: string;
    removeUserTask: string;
    removeProfilePermission: string;
    updateProfilePermission: string;
    listAchievements: string;
    addAchievement: string;
    updateAchievement: string;
    removeAchievement: string;
    toggleActive: string;
};
export declare class UserContextSdk extends BaseSdk implements IUserContextSdk {
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
