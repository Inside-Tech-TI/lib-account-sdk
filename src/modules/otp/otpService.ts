import { authenticator } from "otplib";
import * as QRCode from "qrcode";

class OTPService {
  // Gera um token OTP com base no secret fornecido
  static generateToken(secret: string): string {
    return authenticator.generate(secret);
  }

  // Valida o token OTP fornecido com base no secret
  static validateToken(token: string, secret: string): boolean {
    return authenticator.check(token, secret);
  }

  // Gera um secret para um novo usuário
  static generateUserSecret(): string {
    return authenticator.generateSecret();
  }
  static async generateQRCodeUri(
    secret: string,
    issuer: string,
    accountName: string
  ): Promise<string> {
    return authenticator.keyuri(accountName, issuer, secret);
  }
  // Cria um QR Code para configuração no Google Authenticator
  static async generateQRCode(
    secret: string,
    issuer: string,
    accountName: string
  ): Promise<string> {
    const otpauthUrl = await this.generateQRCodeUri(
      accountName,
      issuer,
      secret
    );
    return await QRCode.toDataURL(otpauthUrl); // Retorna o QR Code como uma URL base64
  }

  // Obtém o código OTP atual com base no secret
  static getCurrentToken(secret: string): string {
    return authenticator.generate(secret);
  }
}

export default OTPService;
