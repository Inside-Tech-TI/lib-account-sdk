export interface IToken {
    generateToken({ accountId, sessionId, expiresIn, login, }: TokenGenerateParams): string;
    decodeToken(token: string): {
        sessionId: string;
        accountId: string;
        expirationSeconds: number;
    };
    validateToken(token: string): boolean;
}
export type TokenGenerateParams = {
    accountId: string;
    sessionId: string;
    expiresIn?: number;
    login?: string;
};
