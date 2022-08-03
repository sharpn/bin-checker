import { Application, Request, Response } from 'express';
import { pickRqr, string } from 'pickrr';
import { getCountyByPostcode } from '../lib/county';

export function controller(app: Application) {
  app.get('/county', async (req: Request, res: Response) => {
    const { postcode } = pickRqr(
      {
        postcode: string,
      },
      req.query,
    );

    const county = await getCountyByPostcode(postcode);
    res.status(200).json(county);
  });
}
