import { Product } from '../../orm/models/product';

export async function getProductByBarcode(barcode: number) {
  const products = await Product.findAll({
    where: {
      barcode,
    },
  });

  return products.map((product) => product.toJSON());
}

export async function createNewProduct(product: {
  barcode: number;
  name: string;
}) {
  const newProduct = await Product.create(product);
  return [newProduct.toJSON()];
}
