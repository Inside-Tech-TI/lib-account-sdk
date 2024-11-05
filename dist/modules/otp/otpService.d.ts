declare class OTPService {
    static generateToken(secret: string): string;
    static validateToken(token: string, secret: string): boolean;
    static generateUserSecret(): string;
    static generateQRCodeUri(secret: string, issuer: string, accountName: string): Promise<string>;
    static generateQRCode(secret: string, issuer: string, accountName: string): Promise<string>;
    static getCurrentToken(secret: string): string;
}
export default OTPService;
