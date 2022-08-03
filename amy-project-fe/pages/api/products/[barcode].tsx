import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const BarcodeApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { barcode } = req.query;

  const { data } = await axios.get(`http://localhost:8001/products/${barcode}`);

  console.log(data);
  res.status(200).json(data);
};

export default BarcodeApi;
