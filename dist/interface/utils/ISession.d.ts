export interface ISession {
    create(user: any, timeoutSeconds: number): Promise<IUserSession>;
    getData<T>(sessionId: string): Promise<IUserSessionData<T> | undefined>;
    validate(sessionId: string): Promise<boolean>;
    updateData<T>(sessionId: string, userSession: T): Promise<boolean>;
    refresh(sessionId: string, timeoutSeconds: number): Promise<boolean>;
    delete(sessionId: string): Promise<boolean>;
    setPersonalData(personalPath: string, data: any, timeoutSeconds: number): Promise<boolean>;
    getPesonalData<T>(personalPath: string): Promise<T | undefined>;
}
export interface IUserSession {
    sessionId: string;
    createdAt: Date;
    expireDate: Date | null;
}
export interface IUserSessionData<T> extends IUserSession {
    data: T;
}
