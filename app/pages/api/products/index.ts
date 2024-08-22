import type { NextApiRequest, NextApiResponse } from 'next';
import products from '../../../database/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(products);
      break;
    case 'POST':
      const newProduct = req.body;
      products.push({ ...newProduct, id: products.length + 1 });
      res.status(201).json(newProduct);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
