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
        throw new Error("Method not implemented.");
    }
    getContextUserInfo(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).get(`/api/${this.app}/context/${this.context}/user/data/info`);
        });
    }
    getUserTasks(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).get(`/api/${this.app}/context/${this.context}/user/data/tasks`);
        });
    }
    addUserTask(jwtToken, task) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).post(`/api/${this.app}/context/${this.context}/user/data/tasks/add`, task);
        });
    }
    checkUserTaskStatus(jwtToken, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).get(`/api/${this.app}/context/${this.context}/user/data/tasks/status/${taskAlias}`);
        });
    }
    updateUserTasks(jwtToken, tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).post(`/api/${this.app}/context/${this.context}/user/data/tasks/update`, tasks);
        });
    }
    removeUserTask(jwtToken, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).delete(`/api/${this.app}/context/${this.context}/user/data/task/remove/${taskAlias}`);
        });
    }
    removeProfilePermission(jwtToken, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).delete(`/api/${this.app}/context/${this.context}/user/data/profiles/remove/${profileAlias}`);
        });
    }
    updateProfilePermission(jwtToken, profiles) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).post(`/api/${this.app}/context/${this.context}/user/data/profiles/update`, profiles);
        });
    }
    listProfiles(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).get(`/api/${this.app}/context/${this.context}/user/data/profiles`);
        });
    }
    listAchievements(jwtToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).get(`/api/${this.app}/context/${this.context}/user/data/achievements`);
        });
    }
    addAchievement(jwtToken, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).post(`/api/${this.app}/context/${this.context}/user/data/achievements/add`, achievement);
        });
    }
    updateAchievement(jwtToken, achievementAlias, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).put(`/api/${this.app}/context/${this.context}/user/data/achievements/update/${achievementAlias}`, achievement);
        });
    }
    removeAchievement(jwtToken, achievementAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAxiosUser(jwtToken).delete(`/api/${this.app}/context/${this.context}/user/data/achievements/remove/${achievementAlias}`);
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
            return yield axiosUser.post("/auth/logout");
        });
    }
    checkToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosUser = this.getAxiosUser(token);
            return yield axiosUser.post(`/auth/check-token`);
        });
    }
    refreshToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const axiosUser = this.getAxiosUser(token);
            return yield axiosUser.post(`/auth/refresh-token`);
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
            if (response.status === 200) {
                return response.data;
            }
            return response.data;
        });
    }
}
exports.AccountSdk = AccountSdk;
//# sourceMappingURL=AccountSdk.js.map