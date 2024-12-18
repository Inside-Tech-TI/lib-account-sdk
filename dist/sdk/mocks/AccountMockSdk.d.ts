import { IAccountSDK } from "../../interface/sdk/IAccountSDK";
import { ContextUserInfo, InteractionItem, IUserAccountDetails, IUserCredentials, UserInteractions } from "../../interface/sdk/IUser";
import { IResultData, IResult } from "../../interface/sdk/types";
export declare class AccountMockSdk implements IAccountSDK {
    protected app: string;
    protected context: string;
    private tokenToRenew;
    private createTokenToLogin;
    private users;
    private loggedUsers;
    private appMock;
    constructor(app: string, context: string);
    getUserTasks(accountId: string): Promise<IResultData<UserInteractions>>;
    private getContextByToken;
    getContextUserInfo<T>(accountId: string): Promise<IResultData<T>>;
    listUserTasks(accountId: string): Promise<IResultData<UserInteractions>>;
    addUserTask(accountId: string, task: InteractionItem): Promise<IResult>;
    checkUserTaskStatus(accountId: string, taskAlias: string): Promise<IResultData<string | undefined>>;
    updateUserTasks(accountId: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(accountId: string, taskAlias: string): Promise<IResult>;
    listProfiles(accountId: string): Promise<IResultData<string[]>>;
    removeProfilePermission(accountId: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(accountId: string, profiles: string[]): Promise<IResult>;
    listAchievements(accountId: string): Promise<IResultData<UserInteractions>>;
    addAchievement(accountId: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(accountId: string, achievementAlias: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(accountId: string, achievementAlias: string): Promise<IResult>;
    toggleActive(accountId: string, active: boolean): Promise<IResult>;
    updateUserInfoByToken<T>(accountId: string, userAccountInfo: T): Promise<IResult>;
    updateUserInfoByAccountId(accountId: string, userDetails: IUserAccountDetails): Promise<IResult>;
    rememberPassword(login: string): Promise<IResultData<{
        tokenToRenew: string;
    }>>;
    resetPasswordFromToken(login: string, tokenToRenew: string, newPassword: string): Promise<IResult>;
    signIn<T>(login: string, password: string): Promise<IResultData<{
        token: string;
        expiresIn: number;
        userInfo: ContextUserInfo<T>;
    }>>;
    checkToken(token: string): Promise<IResult>;
    refreshToken(token: string): Promise<IResultData<{
        token: string;
        expiresIn: number;
    }>>;
    createCredentials(credentials: IUserCredentials, userInContext: ContextUserInfo<any>): Promise<IResultData<{
        id: string;
    }>>;
    signOut(token: string): Promise<IResult>;
}
