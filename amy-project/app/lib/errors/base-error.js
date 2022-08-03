"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError extends Error {
    constructor(message, opts) {
        super(message);
        if (message)
            this.message = message;
        this.errorCode = opts.errorCode;
        this.name = opts.name;
        this.statusCode = opts.statusCode;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base-error.js.map