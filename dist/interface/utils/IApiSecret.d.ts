export interface IApiSecret {
    createApiSecret(): {
        randomSecret: string;
        encryptedSecret: string;
    };
    checkApiSecret(secret: string, encryptedSecret: string): boolean;
}
