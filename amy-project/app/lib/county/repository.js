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
exports.getCountyByPostcode = void 0;
const postcode_1 = require("../../orm/models/postcode");
const postcode_not_found_error_1 = require("../errors/postcode-not-found-error");
function getCountyByPostcode(postcode) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield postcode_1.Postcode.findOne({
            where: {
                id: postcode,
            },
            include: [
                {
                    association: postcode_1.Postcode.associations.county,
                },
            ],
        });
        if (!data) {
            throw new postcode_not_found_error_1.PostcodeNotFound(postcode);
        }
        return data.toJSON();
    });
}
exports.getCountyByPostcode = getCountyByPostcode;
//# sourceMappingURL=repository.js.map