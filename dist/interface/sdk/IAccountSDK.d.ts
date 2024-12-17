import { ContextUserInfo, InteractionItem, IUserAccountDetails, IUserCredentials, UserInteractions } from "./IUser";
import { IResult, IResultData } from "./types";
export interface IAccountSDK {
    signIn<T>(login: string, password: string): Promise<IResultData<{
        token: string;
        expiresIn: number;
        userInfo: ContextUserInfo<T>;
    }>>;
    createCredentials(credentials: IUserCredentials, userInContext: ContextUserInfo<any>, userDetails?: IUserAccountDetails): Promise<IResultData<{
        id: string;
    }>>;
    updateUserInfoByToken<T>(jwtToken: string, userAccountInfo: T): Promise<IResult>;
    updateUserInfoByAccountId(accountId: string, userDetails: IUserAccountDetails): Promise<IResult>;
    rememberPassword(login: string): Promise<IResultData<{
        tokenToRenew: string;
    }>>;
    resetPasswordFromToken(login: string, jwtTokenToRenew: string, newPassword: string): Promise<IResult>;
    signOut(jwtToken: string): Promise<IResult>;
    checkToken<T>(jwtToken: string): Promise<IResultData<{
        jwtToken: string;
        expiresIn: number;
        userInfo: ContextUserInfo<T>;
    }>>;
    refreshToken(jwtToken: string): Promise<IResultData<{
        token: string;
        expiresIn: number;
    }>>;
    getContextUserInfo<T>(jwtToken: string): Promise<IResultData<ContextUserInfo<T>>>;
    listUserTasks(jwtToken: string): Promise<IResultData<UserInteractions>>;
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
    toggleActive(jwtToken: string, active: boolean): Promise<IResult>;
}
