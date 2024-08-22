import type { NextApiRequest, NextApiResponse } from 'next';
import products from '../../../database/products';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { method } = req;

  const productIndex = products.findIndex(p => p.id === parseInt(id as string));

  if (productIndex === -1) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  switch (method) {
    case 'PUT':
    case 'PATCH':
      products[productIndex] = { ...products[productIndex], ...req.body };
      res.status(200).json(products[productIndex]);
      break;
    case 'DELETE':
      products.splice(productIndex, 1);
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['PUT', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
