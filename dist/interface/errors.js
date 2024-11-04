"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    constructor(status, messages) {
        let messagesList = [];
        if (messages) {
            messagesList = Array.isArray(messages) ? messages : [messages];
        }
        super(messagesList.join(", ") || "HttpError");
        this.status = status;
    }
}
exports.HttpError = HttpError;
//# sourceMappingURL=errors.js.map