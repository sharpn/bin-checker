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
exports.getProductByBarcode = void 0;
const axios_1 = require("axios");
const no_product_found_with_barcode_1 = require("../errors/no-product-found-with-barcode");
const Repository = require("./repository");
var OpenFoodFactsProducStatus;
(function (OpenFoodFactsProducStatus) {
    OpenFoodFactsProducStatus[OpenFoodFactsProducStatus["NOTFOUND"] = 0] = "NOTFOUND";
    OpenFoodFactsProducStatus[OpenFoodFactsProducStatus["FOUND"] = 1] = "FOUND";
})(OpenFoodFactsProducStatus || (OpenFoodFactsProducStatus = {}));
function getProductByBarcode(barcode) {
    return __awaiter(this, void 0, void 0, function* () {
        let products = yield Repository.getProductByBarcode(barcode);
        if (!products.length) {
            const { data } = yield axios_1.default.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`, {
                headers: {
                    'request-source': 'https://testingapp.com',
                },
            });
            if (data.status === OpenFoodFactsProducStatus.FOUND) {
                products = yield Repository.createNewProduct({
                    barcode: parseInt(data.code),
                    name: data.product.product_name,
                });
            }
            else {
                throw new no_product_found_with_barcode_1.NoProductFoundWithBarcodeEror(barcode.toString());
            }
        }
        return products.map((product) => {
            return {
                id: product.id,
                name: product.name,
            };
        });
    });
}
exports.getProductByBarcode = getProductByBarcode;
//# sourceMappingURL=index.js.map