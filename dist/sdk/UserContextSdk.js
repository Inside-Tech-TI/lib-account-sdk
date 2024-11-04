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
exports.UserContextSdk = exports.userContextPaths = void 0;
const BaseSdk_1 = require("./BaseSdk");
exports.userContextPaths = {
    contextInfo: "/user/context/info/get",
    updateContextInfo: "/user/context/info/update",
    updateUserTasks: "/user/tasks/update",
    removeUserTask: "/user/tasks/remove",
    removeProfilePermission: "/user/profiles/remove",
    updateProfilePermission: "/user/profiles/update",
    listAchievements: "/user/achievements/list",
    addAchievement: "/user/achievements/add",
    updateAchievement: "/user/achievements/update",
    removeAchievement: "/user/achievements/remove",
    toggleActive: "/user/active",
};
class UserContextSdk extends BaseSdk_1.BaseSdk {
    getContextUserInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.get(this.endpoint + exports.userContextPaths.contextInfo, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return result.data;
        });
    }
    updateUserInfo(token, userAccountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).post(this.endpoint + exports.userContextPaths.updateContextInfo, userAccountInfo);
            return result.data;
        });
    }
    updateUserTasks(token, tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).post(this.endpoint + exports.userContextPaths.updateUserTasks, tasks);
            return result.data;
        });
    }
    removeUserTask(token, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).delete(this.endpoint + exports.userContextPaths.removeUserTask, {
                data: { taskAlias },
            });
            return result.data;
        });
    }
    removeProfilePermission(token, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).delete(this.endpoint + exports.userContextPaths.removeProfilePermission, {
                data: { profileAlias },
            });
            return result.data;
        });
    }
    updateProfilePermission(token, profiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).post(this.endpoint + exports.userContextPaths.updateProfilePermission, profiles);
            return result.data;
        });
    }
    listAchievements(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).get(this.endpoint + exports.userContextPaths.listAchievements);
            return result.data;
        });
    }
    addAchievement(token, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).post(this.endpoint + exports.userContextPaths.addAchievement, achievement);
            return result.data;
        });
    }
    updateAchievement(token, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).post(this.endpoint + exports.userContextPaths.updateAchievement, achievement);
            return result.data;
        });
    }
    removeAchievement(token, achievementAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).delete(this.endpoint + exports.userContextPaths.removeAchievement, {
                data: { alias: achievementAlias },
            });
            return result.data;
        });
    }
    toggleActive(token, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.getAxiosUser(token).put(this.endpoint + exports.userContextPaths.toggleActive, { active });
            return result.data;
        });
    }
}
exports.UserContextSdk = UserContextSdk;
//# sourceMappingURL=UserContextSdk.js.map