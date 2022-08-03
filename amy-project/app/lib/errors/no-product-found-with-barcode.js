"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoProductFoundWithBarcodeEror = void 0;
const base_error_1 = require("./base-error");
class NoProductFoundWithBarcodeEror extends base_error_1.BaseError {
    constructor(barcode) {
        super(`No product found with barcode ${barcode}`, {
            errorCode: 'NO_PRODUCT_FOUND_WITH_BARCODE',
            name: 'NoProductFoundWithBarcodeEror',
            statusCode: 404,
        });
    }
}
exports.NoProductFoundWithBarcodeEror = NoProductFoundWithBarcodeEror;
//# sourceMappingURL=no-product-found-with-barcode.js.map