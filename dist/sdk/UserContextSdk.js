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
    contextInfo: "/data/info",
    updateContextInfo: "/data/info/update",
    getUserTasks: "/data/tasks",
    addUserTasks: "/data/tasks/add",
    checkUserTaskStatus: "/data/tasks/status/:taskAlias",
    updateUserTasks: "/tasks/update",
    removeUserTask: "/tasks/remove",
    listProfiles: "/data/profiles/list",
    removeProfilePermission: "/data/profiles/remove/:profileAlias",
    updateProfilePermission: "/data/profiles/update/",
    deleteProfilePermission: "/data/profiles/delete/:profileAlias",
    listAchievements: "/data/achievements",
    addAchievement: "/data/achievements/add",
    updateAchievement: "/data/achievements/update/:achievementAlias",
    removeAchievement: "/data/achievements/remove/:achievementAlias",
    toggleActive: "/toggle-active",
};
class UserContextSdk extends BaseSdk_1.BaseSdk {
    getContextUserInfo(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.get(this.endpoint + exports.userContextPaths.contextInfo, {
                headers: {
                    Authorization: `Bearer ${accountId}`,
                },
            });
            return result.data;
        });
    }
    listUserTasks(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.get(this.endpoint +
                exports.userContextPaths.listProfiles.replace(":accountId", accountId));
            return result.data;
        });
    }
    updateUserInfo(accountId, userAccountInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.post(this.endpoint +
                exports.userContextPaths.updateContextInfo.replace(":accountId", accountId), userAccountInfo);
            return result.data;
        });
    }
    updateUserTasks(accountId, tasks) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.post(this.endpoint +
                exports.userContextPaths.updateUserTasks.replace(":accountId", accountId), tasks);
            return result.data;
        });
    }
    removeUserTask(accountId, taskAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.delete(this.endpoint +
                exports.userContextPaths.removeUserTask.replace(":accountId", accountId), {
                data: { taskAlias },
            });
            return result.data;
        });
    }
    removeProfilePermission(accountId, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.delete(this.endpoint +
                exports.userContextPaths.removeProfilePermission.replace(":accountId", accountId), {
                data: { profileAlias },
            });
            return result.data;
        });
    }
    updateProfilePermission(accountId, profiles) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.post(this.endpoint +
                exports.userContextPaths.updateProfilePermission.replace(":accountId", accountId), profiles);
            return result.data;
        });
    }
    listAchievements(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.get(this.endpoint +
                exports.userContextPaths.listAchievements.replace(":accountId", accountId));
            return result.data;
        });
    }
    addAchievement(accountId, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.post(this.endpoint +
                exports.userContextPaths.addAchievement.replace(":accountId", accountId), achievement);
            return result.data;
        });
    }
    updateAchievement(accountId, achievement) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.post(this.endpoint +
                exports.userContextPaths.updateAchievement.replace(":accountId", accountId), achievement);
            return result.data;
        });
    }
    removeAchievement(accountId, achievementAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.delete(this.endpoint +
                exports.userContextPaths.removeAchievement.replace(":accountId", accountId), {
                data: { alias: achievementAlias },
            });
            return result.data;
        });
    }
    toggleActive(accountId, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.put(this.endpoint +
                exports.userContextPaths.toggleActive.replace(":accountId", accountId), { active });
            return result.data;
        });
    }
}
exports.UserContextSdk = UserContextSdk;
//# sourceMappingURL=UserContextSdk.js.map