"use strict";
///https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv
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
const axios_1 = require("axios");
const fs_1 = require("fs");
const csv = require("csvtojson");
const path_1 = require("path");
const csvSplitStream = require("csv-split-stream");
const glob_1 = require("glob");
const product_1 = require("../orm/models/product");
const packaging_type_1 = require("../orm/models/packaging-type");
const product_packaging_type_1 = require("../orm/models/product-packaging-type");
Promise.resolve()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    function downloadLatestFile(downloadPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get('https://static.openfoodfacts.org/data/en.openfoodfacts.org.products.csv', { responseType: 'stream' });
            yield csvSplitStream.split(data, {
                lineLimit: 10000,
            }, (index) => fs_1.createWriteStream(path_1.join(downloadPath, `barcode-data-${index}.csv`)));
        });
    }
    function loadFilesFromGlob(globPattern) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                resolve(glob_1.sync(globPattern, {}));
            });
        });
    }
    function getCreatePackagingType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            let packagingType = yield packaging_type_1.PackaingType.findOne({
                where: {
                    name: type,
                },
            });
            if (!packagingType) {
                packagingType = yield packaging_type_1.PackaingType.create({
                    name: type,
                });
            }
            return packagingType.id;
        });
    }
    function associatePackagingTypeWithProduct(product_id, packaging_id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_packaging_type_1.ProductPackagingType.create({
                packagingType_id: packaging_id,
                product_id,
            });
        });
    }
    const downloadFolderPath = path_1.join(__dirname, '..', 'import-data');
    // await downloadLatestFile(downloadFolderPath);
    const files = yield loadFilesFromGlob(path_1.join(downloadFolderPath, 'barcode-data-*.csv'));
    for (const file of files) {
        const json = yield csv({ delimiter: '\t' }).fromFile(file);
        for (const j of json) {
            if (j.code.startsWith('200'))
                continue;
            // only process uk products for now
            if (((_a = j.countries_en) === null || _a === void 0 ? void 0 : _a.indexOf('United Kingdom')) > -1) {
                const { id: product_id } = yield product_1.Product.create({
                    barcode: parseInt(j.code),
                    name: j.product_name,
                });
                if (j.packaging) {
                    const packagingStrings = j.packaging.split(',');
                    for (const packagingString of packagingStrings) {
                        if (!packagingString)
                            continue;
                        const splits = packagingString.split(':');
                        const formattedString = splits.length > 1
                            ? splits[1].toLowerCase().trim()
                            : splits[0].toLowerCase().trim();
                        const id = yield getCreatePackagingType(formattedString);
                        yield associatePackagingTypeWithProduct(product_id, id);
                    }
                }
            }
        }
    }
    const y = 1;
}))
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
//# sourceMappingURL=import-products.js.map