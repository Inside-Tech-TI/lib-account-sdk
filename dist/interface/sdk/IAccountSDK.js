"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInteractionsObject = exports.UserInteractionItem = void 0;
const zod_1 = require("zod");
exports.UserInteractionItem = zod_1.z.object({
    alias: zod_1.z.string(),
    name: zod_1.z.string(),
    url: zod_1.z.string().optional(),
    info: zod_1.z.any().optional(),
});
exports.UserInteractionsObject = zod_1.z.record(exports.UserInteractionItem);
//# sourceMappingURL=IAccountSDK.js.map