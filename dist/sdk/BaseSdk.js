"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAxiosInstance = exports.BaseSdk = void 0;
const axios_1 = __importDefault(require("axios"));
const axiosInstanceMap = new Map();
class BaseSdk {
    constructor(endpoint, apiToken) {
        this.endpoint = endpoint;
        this.apiToken = apiToken;
        this.axiosInstance = (0, exports.getAxiosInstance)(endpoint, apiToken);
    }
    getAxiosUser(token) {
        return (0, exports.getAxiosInstance)(this.endpoint, this.apiToken, token);
    }
}
exports.BaseSdk = BaseSdk;
const getAxiosInstance = (baseURL, apiToken, userToken) => {
    const key = `${baseURL}.${apiToken}.${userToken}`;
    if (!axiosInstanceMap.has(key)) {
        const headers = {
            "Api-Authorization": `Bearer ${apiToken}`,
            "x-api-key": `${apiToken}`,
        };
        if (userToken) {
            headers["Authorization"] = `Bearer ${userToken}`;
        }
        axiosInstanceMap.set(key, axios_1.default.create({
            baseURL,
            headers,
        }));
    }
    return axiosInstanceMap.get(key);
};
exports.getAxiosInstance = getAxiosInstance;
//# sourceMappingURL=BaseSdk.js.map