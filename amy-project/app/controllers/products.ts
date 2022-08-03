import { Application, Request, Response } from 'express';
import { number, pickRqr } from 'pickrr';
import { getProductByBarcode } from '../lib/product';

export function controller(app: Application) {
  app.get('/products/:barcode', async (req: Request, res: Response) => {
    const { barcode } = pickRqr(
      {
        barcode: number,
      },
      req.params,
    );

    const products = await getProductByBarcode(barcode);
    res.status(200).json(products);
  });
}
