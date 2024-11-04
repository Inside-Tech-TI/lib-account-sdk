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
exports.AppSdk = exports.appPaths = void 0;
const BaseSdk_1 = require("./BaseSdk");
exports.appPaths = {
    contextInfo: "/context/info/get",
    createContext: "/context/create",
    removeContext: "/context/remove",
    toggleActiveContext: "/context/active",
    listContexts: "/context/list",
    createProfile: "/profile/create",
    removeProfile: "/profile/remove",
    listProfiles: "/profile/list",
};
class AppSdk extends BaseSdk_1.BaseSdk {
    createContext(contextInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.post(this.endpoint + exports.appPaths.createContext, contextInfo);
            return result.data;
        });
    }
    removeContext(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.delete(this.endpoint + exports.appPaths.removeContext, {
                data: { context },
            });
            return result.data;
        });
    }
    toggleActiveContext(context, active) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.put(this.endpoint + exports.appPaths.toggleActiveContext, { context, active });
            return result.data;
        });
    }
    getContext(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.get(this.endpoint + exports.appPaths.contextInfo, {
                params: { context },
            });
            return result.data;
        });
    }
    listContexts() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.get(this.endpoint + exports.appPaths.listContexts);
            return result.data;
        });
    }
    createProfile(context, profileInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.post(this.endpoint + exports.appPaths.createProfile, { context, profile: profileInfo });
            return result.data;
        });
    }
    removeProfile(context, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.delete(this.endpoint + exports.appPaths.removeProfile, {
                data: { profileAlias, context },
            });
            return result.data;
        });
    }
    listProfiles(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.axiosInstance.get(this.endpoint + exports.appPaths.listProfiles, {
                params: { context },
            });
            return result.data;
        });
    }
}
exports.AppSdk = AppSdk;
//# sourceMappingURL=AppSdk.js.map