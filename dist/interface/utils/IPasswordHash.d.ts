import { IResultData } from "../types";
export interface IPasswordHash {
    createPassword(): string;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hash: string): Promise<boolean>;
    validatePassword(password: string): IResultData<boolean>;
}
