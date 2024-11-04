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
exports.AppMockSdk = void 0;
class AppMockSdk {
    constructor(app, context) {
        this.app = app;
        this.context = context;
        this.contexts = new Map();
    }
    createContext(contextInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            this.contexts.set(contextInfo.id, contextInfo);
            return { success: true };
        });
    }
    removeContext(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.contexts.has(context))
                return { success: false };
            this.contexts.delete(context);
            return { success: true };
        });
    }
    toggleActiveContext(context, active) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.contexts.has(context))
                return { success: false };
            const contextInfo = this.contexts.get(context);
            if (contextInfo) {
                contextInfo.active = active;
            }
            return { success: true };
        });
    }
    getContext(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.contexts.has(context)) {
                throw new Error("Context not found");
            }
            return this.contexts.get(context);
        });
    }
    listContexts() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                data: Array.from(this.contexts.values()),
                success: true,
            };
        });
    }
    createProfile(context, profileInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context)
                return false;
            const contextInfo = yield this.getContext(context);
            if (!contextInfo)
                return false;
            if (!contextInfo.profiles)
                contextInfo.profiles = {};
            contextInfo.profiles[profileInfo.id] = profileInfo;
            return true;
        });
    }
    removeProfile(context, profileAlias) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context)
                return false;
            const contextInfo = yield this.getContext(context);
            if (!contextInfo)
                return false;
            if (!contextInfo.profiles)
                return false;
            delete contextInfo.profiles[profileAlias];
            return true;
        });
    }
    listProfiles(context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context)
                return [];
            const contextInfo = yield this.getContext(context);
            if (!contextInfo)
                return [];
            return Object.values(contextInfo.profiles) || [];
        });
    }
}
exports.AppMockSdk = AppMockSdk;
//# sourceMappingURL=AppMockSdk.js.map