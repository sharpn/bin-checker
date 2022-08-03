import axios from 'axios';
import { NoProductFoundWithBarcodeEror } from '../errors/no-product-found-with-barcode';
import * as Repository from './repository';

enum OpenFoodFactsProducStatus {
  'NOTFOUND' = 0,
  'FOUND' = 1,
}

interface IOpenFoodFactsProduct {
  code: string;
  status: OpenFoodFactsProducStatus;
  product: {
    product_name: string;
  };
}

export async function getProductByBarcode(barcode: number) {
  let products = await Repository.getProductByBarcode(barcode);

  if (!products.length) {
    const { data } = await axios.get<IOpenFoodFactsProduct>(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      {
        headers: {
          'request-source': 'https://testingapp.com',
        },
      },
    );

    if (data.status === OpenFoodFactsProducStatus.FOUND) {
      products = await Repository.createNewProduct({
        barcode: parseInt(data.code),
        name: data.product.product_name,
      });
    } else {
      throw new NoProductFoundWithBarcodeEror(barcode.toString());
    }
  }

  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
    };
  });
}
