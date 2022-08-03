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
const county_1 = require("../orm/models/county");
const postcode_1 = require("../orm/models/postcode");
const csv = require("csvtojson");
const path_1 = require("path");
const axios_1 = require("axios");
const fs_1 = require("fs");
Promise.resolve()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    function downloadLatestFile(downloadPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get(`https://opendata.camden.gov.uk/api/views/g3bz-7ur8/rows.csv?accessType=DOWNLOAD`, { responseType: 'blob' });
            fs_1.writeFileSync(downloadPath, data);
        });
    }
    const downloadPath = path_1.join(__dirname, '..', 'import-data', 'data.csv');
    yield downloadLatestFile(downloadPath);
    const json = yield csv().fromFile(downloadPath);
    function createCountyAuthorityIfNotExist(authority_id, authorityName) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield county_1.County.findOne({
                where: {
                    id: authority_id,
                },
            });
            if (!exists) {
                yield county_1.County.create({
                    id: authority_id,
                    name: authorityName,
                });
            }
        });
    }
    function createPostCodeEntry(postcodeId, authorityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const postcode = yield postcode_1.Postcode.findOne({
                where: {
                    id: postcodeId,
                },
            });
            if (!postcode) {
                yield postcode_1.Postcode.create({
                    id: postcodeId,
                    county_id: authorityId,
                });
                return;
            }
            postcode.county_id = authorityId;
            yield postcode.save();
        });
    }
    for (let j = 0; j < json.length; j++) {
        const data = json[j];
        const postcode = data['Postcode 1'].replace(/\s/g, '');
        console.log(`${j} of ${json.length}`);
        yield createCountyAuthorityIfNotExist(data['Local Authority Code'], data['Local Authority Name']);
        yield createPostCodeEntry(postcode, data['Local Authority Code']);
    }
    process.exit(0);
}))
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=import.js.map