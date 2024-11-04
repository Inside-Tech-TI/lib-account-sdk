"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountMockSdk = void 0;
const errors_1 = require("../../interface/errors");
const AppMockSdk_1 = require("./AppMockSdk");
class AccountMockSdk {
    createTokenToLogin(login) {
        const token = `mock-token-${new Date().getTime() + 300000}`;
        this.tokenToRenew.set(token, login);
        setTimeout(() => {
            this.tokenToRenew.delete(token);
        }, 3600);
        return token;
    }
    constructor(app, context) {
        this.app = app;
        this.context = context;
        this.tokenToRenew = new Map();
        this.users = new Map();
        this.loggedUsers = new Map();
        this.appMock = new AppMockSdk_1.AppMockSdk(app, context);
    }
    getContextByToken(token) {
        if (this.loggedUsers.has(token)) {
            return this.loggedUsers.get(token);
        }
        throw new errors_1.HttpError(403, "invalid token");
    }
    getContextUserInfo(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return { success: true, data: this.getContextByToken(jwtToken).info };
        });
    }
    listUserTasks(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            return { success: true, data: user.tasks };
        });
    }
    addUserTask(jwtToken, task) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            if (!user.tasks) {
                user.tasks = {};
            }
            user.tasks[task.alias] = task;
            return { success: true };
        });
    }
    checkUserTaskStatus(jwtToken, taskAlias) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            if (!user.tasks) {
                return { success: true, data: undefined };
            }
            return {
                success: true,
                data: (_a = user.tasks[taskAlias]) === null || _a === void 0 ? void 0 : _a.status,
            };
        });
    }
    updateUserTasks(jwtToken, tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            user.tasks = tasks;
            return { success: true };
        });
    }
    removeUserTask(jwtToken, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            if (!user.tasks) {
                return { success: true };
            }
            delete user.tasks[taskAlias];
            return { success: true };
        });
    }
    listProfiles(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            return { success: true, data: user.profiles || [] };
        });
    }
    removeProfilePermission(jwtToken, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            if (!user.profiles) {
                return { success: true };
            }
            const indexOfProfile = user.profiles.indexOf(profileAlias);
            if (indexOfProfile < 0) {
                return { success: true };
            }
            user.profiles.splice(indexOfProfile, 1);
            return { success: true };
        });
    }
    updateProfilePermission(jwtToken, profiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            const existedProfiles = yield this.appMock.listProfiles(this.context);
            if (!Array.isArray(existedProfiles)) {
                return {
                    success: false,
                    messages: ["Account Error: Não há profiles em seu app/context."],
                };
            }
            if (!user.profiles) {
                user.profiles = [];
            }
            existedProfiles.forEach((profile) => {
                if (!profiles.includes(profile.id)) {
                    throw new errors_1.HttpError(400, `Profile ${profile} não existe`);
                }
                if (!user.profiles.includes(profile.id)) {
                    user.profiles.push(profile.id);
                }
            });
            return { success: true };
        });
    }
    listAchievements(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            return { success: true, data: user.achievements };
        });
    }
    addAchievement(jwtToken, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            if (!user.achievements) {
                user.achievements = {};
            }
            user.achievements[achievement.alias] = achievement;
            return { success: true };
        });
    }
    updateAchievement(jwtToken, achievementAlias, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            if (!user.achievements) {
                return { success: true };
            }
            user.achievements[achievementAlias] = achievement;
            return { success: true };
        });
    }
    removeAchievement(jwtToken, achievementAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            if (!user.achievements) {
                return { success: true };
            }
            delete user.achievements[achievementAlias];
            return { success: true };
        });
    }
    toggleActive(jwtToken, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            user.active = active;
            return { success: true };
        });
    }
    updateUserInfoByToken(jwtToken, userAccountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.getContextByToken(jwtToken);
            user.info = userAccountInfo;
            return { success: true };
        });
    }
    updateUserInfoByAccountId(accountId, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.get(accountId);
            if (!user) {
                return { success: false, messages: ["Usuário não encontrado"] };
            }
            user.context.info = userDetails;
            return { success: true };
        });
    }
    rememberPassword(login) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.get(login);
            if (!user) {
                return { success: false, messages: ["Usuário não encontrado"] };
            }
            const token = this.createTokenToLogin(login);
            return { success: true, data: { tokenToRenew: token } };
        });
    }
    resetPasswordFromToken(login, tokenToRenew, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.tokenToRenew.has(tokenToRenew)) {
                return { success: false, messages: ["Token inválido"] };
            }
            if (this.tokenToRenew.get(tokenToRenew) !== login) {
                return { success: false, messages: ["Token inválido"] };
            }
            const user = this.users.get(login);
            if (!user) {
                return { success: false, messages: ["Usuário não encontrado"] };
            }
            user.password = newPassword;
            return { success: true };
        });
    }
    signIn(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.get(login);
            if (!user) {
                return { success: false, messages: ["Usuário não encontrado"] };
            }
            if (user.password !== password) {
                return { success: false, messages: ["Senha inválida"] };
            }
            const token = `${login}-${new Date().getTime() + 300000}`;
            this.loggedUsers.set(token, user.context);
            return {
                success: true,
                data: {
                    token,
                    expiresIn: 300,
                    userInfo: user.context,
                },
            };
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.loggedUsers.has(token)) {
                return { success: true };
            }
            return { success: false, messages: ["invalid token"] };
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.loggedUsers.has(token)) {
                return { success: false, messages: ["invalid token"] };
            }
            const user = this.loggedUsers.get(token);
            const time = new Date(parseInt(token.split("-")[1]));
            if (time < new Date()) {
                return { success: false, messages: ["token expired"] };
            }
            const newTime = new Date();
            newTime.setMinutes(newTime.getMinutes() + 5);
            const newToken = `${token.split("-")[0]}-${newTime.getTime()}`;
            return { success: true, data: { token: newToken, expiresIn: 300 } };
        });
    }
    createCredentials(credentials, userInContext) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.users.get(credentials.login);
            if (user) {
                user.context = userInContext;
                return {
                    success: true,
                    messages: ["Usuário já existia, atualizado os contextos"],
                };
            }
            const key = `${credentials.login}`;
            this.users.set(key, {
                password: credentials.password,
                context: userInContext,
            });
            return { success: true, messages: ["Usuário criado com sucesso"] };
        });
    }
    signOut(token) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loggedUsers.delete(token);
            return { success: true };
        });
    }
}
exports.AccountMockSdk = AccountMockSdk;
//# sourceMappingURL=AccountMockSdk.js.map