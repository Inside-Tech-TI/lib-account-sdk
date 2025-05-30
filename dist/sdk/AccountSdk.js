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
exports.AccountSdk = void 0;
const BaseSdk_1 = require("./BaseSdk");
const UserContextSdk_1 = require("./UserContextSdk");
class AccountSdk extends BaseSdk_1.BaseSdk {
    constructor(app, context, endpoint, apiToken) {
        super(endpoint, apiToken);
        this.app = app;
        this.context = context;
    }
    updateUserInfoByToken(jwtToken, userAccountInfo) {
        throw new Error("Method not implemented.");
    }
    getUserAccountPath(accountId) {
        return `/api/${this.app}/context/${this.context}/user/${accountId}`;
    }
    updateUserInfoByAccountId(accountId, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.updateContextInfo}`, userDetails)).data;
        });
    }
    getContextUserInfo(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.get(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.contextInfo}`)).data;
        });
    }
    getUserTasks(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.get(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.getUserTasks}`)).data;
        });
    }
    addUserTask(accountId, task) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.addUserTasks}`, task)).data;
        });
    }
    checkUserTaskStatus(accountId, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.axiosInstance.get(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.checkUserTaskStatus.replace(":taskAlias", taskAlias)})`);
        });
    }
    updateUserTasks(accountId, tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.axiosInstance.post(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.updateUserTasks}`, tasks);
        });
    }
    removeUserTask(accountId, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.delete(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.removeUserTask.replace(":taskAlias", taskAlias)}`)).data;
        });
    }
    removeProfilePermission(accountId, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.delete(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.removeProfilePermission.replace(":profileAlias", profileAlias)}`)).data;
        });
    }
    updateProfilePermission(accountId, profiles) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.updateProfilePermission}`, profiles)).data;
        });
    }
    listProfiles(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.get(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.listProfiles}`)).data;
        });
    }
    listAchievements(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.get(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.listAchievements}`)).data;
        });
    }
    addAchievement(accountId, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.addAchievement}`, achievement)).data;
        });
    }
    updateAchievement(accountId, achievementAlias, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.put(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.updateAchievement.replace(":achievementAlias", achievementAlias)}`, achievement)).data;
        });
    }
    removeAchievement(accountId, achievementAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.delete(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.removeAchievement.replace(":achievementAlias", achievementAlias)}`)).data;
        });
    }
    toggleActive(accountId, active) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apiPost(`${this.getUserAccountPath(accountId)}${UserContextSdk_1.userContextPaths.toggleActive}`, { active });
        });
    }
    rememberPassword(login_1) {
        return __awaiter(this, arguments, void 0, function* (login, timeoutInSeconds = 180) {
            return yield this.apiPost(`/public/forgot-password`, { login, timeoutInSeconds });
        });
    }
    resetPasswordFromToken(login, tokenToRenew, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apiPost(`/public/reset-password`, {
                login,
                tokenToRenew,
                newPassword,
            });
        });
    }
    signIn(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apiPost("/public/signin/password", {
                password,
                login,
                app: this.app,
                context: this.context,
            });
        });
    }
    signOut(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosUser = this.getAxiosUser(token);
            return (yield axiosUser.post("/auth/logout")).data;
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosUser = this.getAxiosUser(token);
            return (yield axiosUser.post(`/auth/check-token`)).data;
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosUser = this.getAxiosUser(token);
            return (yield axiosUser.post(`/auth/refresh-token`)).data;
        });
    }
    createCredentials(credentials_1, userInContext_1) {
        return __awaiter(this, arguments, void 0, function* (credentials, userInContext, userDetails = {}) {
            return yield this.apiPost(`/api/${this.app}/context/${this.context}/user-credentials/create`, { credentials, userDetails, userInContext });
        });
    }
    apiPost(endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.axiosInstance.post(endpoint, data);
            return response.data;
        });
    }
}
exports.AccountSdk = AccountSdk;
//# sourceMappingURL=AccountSdk.js.map