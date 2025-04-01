import { IAccountSDK } from "../interface/sdk/IAccountSDK";
import { BaseSdk } from "./BaseSdk";
import { IResultData, IResult } from "../interface/sdk/types";
import { ContextUserInfo, InteractionItem, IUserAccountDetails, IUserCredentials, UserInteractions } from "../interface/sdk/IUser";
export declare class AccountSdk extends BaseSdk implements IAccountSDK {
    protected app: string;
    protected context: string;
    constructor(app: string, context: string, endpoint: string, apiToken: string);
    updateUserInfoByToken<T>(jwtToken: string, userAccountInfo: T): Promise<IResult>;
    updateUserInfoByAccountId(accountId: string, userDetails: IUserAccountDetails): Promise<IResult>;
    getContextUserInfo<T>(jwtToken: string): Promise<IResultData<ContextUserInfo<T>>>;
    getUserTasks(jwtToken: string): Promise<IResultData<UserInteractions>>;
    addUserTask(jwtToken: string, task: InteractionItem): Promise<IResult>;
    checkUserTaskStatus(jwtToken: string, taskAlias: string): Promise<IResultData<string | undefined>>;
    updateUserTasks(jwtToken: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(jwtToken: string, taskAlias: string): Promise<IResult>;
    removeProfilePermission(jwtToken: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(jwtToken: string, profiles: string[]): Promise<IResult>;
    listProfiles(jwtToken: string): Promise<IResultData<string[]>>;
    listAchievements(jwtToken: string): Promise<IResultData<UserInteractions>>;
    addAchievement(jwtToken: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(jwtToken: string, achievementAlias: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(jwtToken: string, achievementAlias: string): Promise<IResult>;
    toggleActive(accountId: string, active: boolean): Promise<IResult>;
    rememberPassword(login: string): Promise<IResultData<{
        tokenToRenew: string;
    }>>;
    resetPasswordFromToken(login: string, tokenToRenew: string, newPassword: string): Promise<IResult>;
    signIn<T>(login: string, password: string): Promise<IResultData<{
        token: string;
        expiresIn: number;
        userInfo: ContextUserInfo<T>;
    }>>;
    signOut(token: string): Promise<IResult>;
    checkToken(token: string): Promise<IResult>;
    refreshToken(token: string): Promise<IResultData<{
        token: string;
        expiresIn: number;
    }>>;
    createCredentials(credentials: IUserCredentials, userInContext: ContextUserInfo<any>, userDetails?: any): Promise<IResultData<{
        id: string;
    }>>;
}
