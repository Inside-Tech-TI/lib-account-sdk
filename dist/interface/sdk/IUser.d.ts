export interface I2faInfo<T> {
    active: boolean;
    secret: string;
    mode: string;
    data?: T;
}
export interface IUserAccountDetails {
    name: string;
    email?: string;
    sms?: string;
    whatsapp?: string;
    avatarUrl?: string;
    twofa?: I2faInfo<any>;
}
export interface IUserAccountInfo<T> {
    userDetails: IUserAccountDetails;
    active: boolean;
    accountTasks?: UserInteractions;
    apps: {
        [appName: string]: UserContexts<any>;
    };
}
export interface UserContexts<T> {
    [alias: string]: ContextUserInfo<T>;
}
export interface ContextUserInfo<T> {
    profiles: string[];
    achievements?: UserInteractions;
    tasks?: UserInteractions;
    active: boolean;
    info?: T;
}
export interface UserInteractions {
    [alias: string]: InteractionItem;
}
export interface InteractionItem {
    alias: string;
    name: string;
    url?: string;
    status?: string;
    info?: any;
}
export interface CreateUserAccountInfo<T> {
    profiles: UserInteractions;
    tasks: UserInteractions;
    info: T;
}
export interface UserAccountInfo<T> extends CreateUserAccountInfo<T> {
    id: string;
    active: boolean;
}
export interface IUserCredentials {
    login: string;
    password: string;
    reminder?: string;
}
