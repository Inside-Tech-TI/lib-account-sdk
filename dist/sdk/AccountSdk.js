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
class AccountSdk extends BaseSdk_1.BaseSdk {
    constructor(app, context, endpoint, apiToken) {
        super(endpoint, apiToken);
        this.app = app;
        this.context = context;
    }
    updateUserInfoByToken(jwtToken, userAccountInfo) {
        throw new Error("Method not implemented.");
    }
    updateUserInfoByAccountId(accountId, userDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`/api/${this.app}/context/${this.context}/user/${accountId}/data/info/update`, userDetails)).data;
        });
    }
    getContextUserInfo(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.get(`/api/${this.app}/context/${this.context}/user/${accountId}/data/info`)).data;
        });
    }
    getUserTasks(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.get(`/api/${this.app}/context/${this.context}/user/${accountId}/data/tasks`)).data;
        });
    }
    addUserTask(accountId, task) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`/api/${this.app}/context/${this.context}/user/${accountId}/data/tasks/add`, task)).data;
        });
    }
    checkUserTaskStatus(accountId, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented in account api.");
        });
    }
    updateUserTasks(accountId, tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented in account api.");
        });
    }
    removeUserTask(jwtToken, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getAxiosUser(jwtToken).delete(`/api/${this.app}/context/${this.context}/user/data/task/remove/${taskAlias}`)).data;
        });
    }
    removeProfilePermission(accountId, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.delete(`/api/${this.app}/context/${this.context}/user/${accountId}/data/profiles/remove/${profileAlias}`)).data;
        });
    }
    updateProfilePermission(accountId, profiles) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`/api/${this.app}/context/${this.context}/user/${accountId}/data/profiles/update`, profiles)).data;
        });
    }
    listProfiles(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getAxiosUser(jwtToken).get(`/api/${this.app}/context/${this.context}/user/data/profiles`)).data;
        });
    }
    listAchievements(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.get(`/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/list`)).data;
        });
    }
    addAchievement(accountId, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.post(`/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/add`, achievement)).data;
        });
    }
    updateAchievement(accountId, achievementAlias, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.put(`/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/update/${achievementAlias}`, achievement)).data;
        });
    }
    removeAchievement(accountId, achievementAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axiosInstance.delete(`/api/${this.app}/context/${this.context}/user/${accountId}/data/achievements/remove/${achievementAlias}`)).data;
        });
    }
    toggleActive(accountId, active) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apiPost(`/api/${this.app}/context/${this.context}/user/${accountId}/toggle-active`, { active });
        });
    }
    rememberPassword(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.apiPost(`/public/forgot-password`, { login });
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