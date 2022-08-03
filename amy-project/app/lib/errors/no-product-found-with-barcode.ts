import { BaseError } from './base-error';

export class NoProductFoundWithBarcodeEror extends BaseError {
  constructor(barcode: string) {
    super(`No product found with barcode ${barcode}`, {
      errorCode: 'NO_PRODUCT_FOUND_WITH_BARCODE',
      name: 'NoProductFoundWithBarcodeEror',
      statusCode: 404,
    });
  }
}
