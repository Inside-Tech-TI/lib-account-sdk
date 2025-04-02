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
    getContextUserInfo<T>(accountId: string): Promise<IResultData<ContextUserInfo<T>>>;
    getUserTasks(accountId: string): Promise<IResultData<UserInteractions>>;
    addUserTask(accountId: string, task: InteractionItem): Promise<IResult>;
    checkUserTaskStatus(accountId: string, taskAlias: string): Promise<IResultData<string | undefined>>;
    updateUserTasks(accountId: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(jwtToken: string, taskAlias: string): Promise<IResult>;
    removeProfilePermission(accountId: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(accountId: string, profiles: string[]): Promise<IResult>;
    listProfiles(jwtToken: string): Promise<IResultData<string[]>>;
    listAchievements(accountId: string): Promise<IResultData<UserInteractions>>;
    addAchievement(accountId: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(accountId: string, achievementAlias: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(accountId: string, achievementAlias: string): Promise<IResult>;
    toggleActive(accountId: string, active: boolean): Promise<IResult>;
    rememberPassword(login: string, timeoutInSeconds?: number): Promise<IResultData<{
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
    private apiPost;
}
