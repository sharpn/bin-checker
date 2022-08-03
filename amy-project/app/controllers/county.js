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
exports.controller = void 0;
const pickrr_1 = require("pickrr");
const county_1 = require("../lib/county");
function controller(app) {
    app.get('/county', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { postcode } = pickrr_1.pickRqr({
            postcode: pickrr_1.string,
        }, req.query);
        const county = yield county_1.getCountyByPostcode(postcode);
        res.status(200).json(county);
    }));
}
exports.controller = controller;
//# sourceMappingURL=county.js.map