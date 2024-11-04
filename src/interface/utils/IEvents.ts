import { IAppDTO } from "../types";
import { ContextUserInfo, I2faInfo, IUserAccountDetails } from "../sdk/IUser";

export interface IAccountEventsListener {
  onTwoFaRequired(
    callback: (data: { userId: string; twofa: I2faInfo<any> }) => Promise<void>
  ): void;
  onAppUpdate(
    callback: (appId: string, deleted: boolean) => Promise<void>
  ): void;
  onUserCredentialsCreated(
    callback: (accountId: string, user: ContextUserInfo<any>) => Promise<void>
  ): void;
  onUserPasswordChanged(
    callback: (
      accountId: string,
      login: string,
      reminder?: string
    ) => Promise<void>
  ): void;
  onUserForgotPassword(
    callback: (
      accountId: string,
      login: string,
      tokenToRenew: string,
      user: ContextUserInfo<any>
    ) => void
  ): void;
  onUserLoggedIn(
    callback: (accountId: string, user: ContextUserInfo<any>) => Promise<void>
  ): void;
  onUserLoggedOut(callback: (accountId: string) => Promise<void>): void;
}

export interface IAccountEventsDispatcher {
  twoFaRequired(
    userDetails: IUserAccountDetails,
    twofa: I2faInfo<any>
  ): Promise<void>;

  credentialsCreated(
    accountId: string,
    user: ContextUserInfo<any>
  ): Promise<void>;
  passwordChanged(
    accountId: string,
    login: string,
    reminder?: string
  ): Promise<void>;
  rememberPassword(
    accountId: string,
    login: string,
    tokenToRenew: string,
    user: ContextUserInfo<any>
  ): Promise<void>;
  userLoggedIn(accountId: string, user: ContextUserInfo<any>): Promise<void>;
  userLoggedOut(accountId: string): Promise<void>;
}
export interface IAppEventDispatcher {
  appUpdated(appId: string, deleted: boolean): Promise<void>;
  appCreated(app: IAppDTO): Promise<void>;
}
export interface IAppEventListener {
  onAppCreated(callback: (app: IAppDTO) => Promise<void>): void;
}
export interface IEventHandler {
  connect(): Promise<{ success: boolean; messages: string[] }>;
  disconnect(): Promise<boolean>;
  subscribe<T>(
    subject: string,
    callback: (data: T) => Promise<any>
  ): Promise<{ subscribeId: string }>;
  unsubscribe<T>(subscribeId: string): Promise<boolean>;
  dispatch(subject: string, data: any): Promise<boolean>;
}
