"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostcodeNotFound = void 0;
const base_error_1 = require("./base-error");
class PostcodeNotFound extends base_error_1.BaseError {
    constructor(postcode) {
        super(`Postcode: ${postcode} not found`, {
            errorCode: 'POSTCODE_NOT_FOUND',
            name: 'PostcodeNotFound',
            statusCode: 404,
        });
    }
}
exports.PostcodeNotFound = PostcodeNotFound;
//# sourceMappingURL=postcode-not-found-error.js.map