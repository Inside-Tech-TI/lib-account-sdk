import { ContextUserInfo, InteractionItem, IUserAccountDetails, IUserCredentials, UserInteractions } from "./IUser";
import { IResult, IResultData } from "./types";
import { z } from "zod";
export declare const UserInteractionItem: z.ZodObject<{
    alias: z.ZodString;
    name: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    info: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    alias: string;
    name: string;
    url?: string | undefined;
    info?: any;
}, {
    alias: string;
    name: string;
    url?: string | undefined;
    info?: any;
}>;
export declare const UserInteractionsObject: z.ZodRecord<z.ZodString, z.ZodObject<{
    alias: z.ZodString;
    name: z.ZodString;
    url: z.ZodOptional<z.ZodString>;
    info: z.ZodOptional<z.ZodAny>;
}, "strip", z.ZodTypeAny, {
    alias: string;
    name: string;
    url?: string | undefined;
    info?: any;
}, {
    alias: string;
    name: string;
    url?: string | undefined;
    info?: any;
}>>;
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
    rememberPassword(login: string, timeoutInSeconds?: number): Promise<IResultData<{
        tokenToRenew: string;
    }>>;
    resetPasswordFromToken(login: string, jwtTokenToRenew: string, newPassword: string): Promise<IResult>;
    signOut(jwtToken: string): Promise<IResult>;
    checkToken<T>(jwtToken: string): Promise<IResultData<{
        jwtToken: string;
        expiresIn: number;
        userInfo: ContextUserInfo<T>;
        accountId: string;
    }>>;
    refreshToken(jwtToken: string): Promise<IResultData<{
        token: string;
        expiresIn: number;
    }>>;
    getContextUserInfo<T>(accountId: string): Promise<IResultData<ContextUserInfo<T>>>;
    getUserTasks(accountId: string): Promise<IResultData<UserInteractions>>;
    addUserTask(accountId: string, task: InteractionItem): Promise<IResult>;
    checkUserTaskStatus(accountId: string, taskAlias: string): Promise<IResultData<string | undefined>>;
    updateUserTasks(accountId: string, tasks: UserInteractions): Promise<IResult>;
    removeUserTask(accountId: string, taskAlias: string): Promise<IResult>;
    removeProfilePermission(accountId: string, profileAlias: string): Promise<IResult>;
    updateProfilePermission(accountId: string, profiles: string[]): Promise<IResult>;
    listProfiles(accountId: string): Promise<IResultData<string[]>>;
    listAchievements(accountId: string): Promise<IResultData<UserInteractions>>;
    addAchievement(accountId: string, achievement: InteractionItem): Promise<IResult>;
    updateAchievement(accountId: string, achievementAlias: string, achievement: InteractionItem): Promise<IResult>;
    removeAchievement(accountId: string, achievementAlias: string): Promise<IResult>;
    toggleActive(accountId: string, active: boolean): Promise<IResult>;
}
