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
    private getContextByToken;
    getContextUserInfo<T>(jwtToken: string): Promise<IResultData<T>>;
    listUserTasks(jwtToken: string): Promise<IResultData<UserInteractions>>;
    addUserTask(jwtToken: string, task: InteractionItem): Promise<IResult>;
    checkUserTaskStatus(jwtToken: string, taskAlias: string): Promise<IResultData<string | undefined>>;
    updateUserTasks(jwtToken: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(jwtToken: string, taskAlias: string): Promise<IResult>;
    listProfiles(jwtToken: string): Promise<IResultData<string[]>>;
    removeProfilePermission(jwtToken: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(jwtToken: string, profiles: string[]): Promise<IResult>;
    listAchievements(jwtToken: string): Promise<IResultData<UserInteractions>>;
    addAchievement(jwtToken: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(jwtToken: string, achievementAlias: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(jwtToken: string, achievementAlias: string): Promise<IResult>;
    toggleActive(jwtToken: string, active: boolean): Promise<IResult>;
    updateUserInfoByToken<T>(jwtToken: string, userAccountInfo: T): Promise<IResult>;
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
    createCredentials(credentials: IUserCredentials, userInContext: ContextUserInfo<any>): Promise<IResult>;
    signOut(token: string): Promise<IResult>;
}
