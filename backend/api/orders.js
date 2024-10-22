import { promises as fs } from 'node:fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const orderData = req.body.order;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: 'Missing data.' });
    }

    if (
      !orderData.customer.email?.includes('@') ||
      !orderData.customer.name?.trim() ||
      !orderData.customer.street?.trim() ||
      !orderData.customer['postal-code']?.trim() ||
      !orderData.customer.city?.trim()
    ) {
      return res.status(400).json({ message: 'Invalid or missing customer data.' });
    }

    try {
      const newOrder = {
        ...orderData,
        id: (Math.random() * 1000).toString(),
      };
      const orders = await fs.readFile('./data/orders.json', 'utf8');
      const allOrders = JSON.parse(orders);
      allOrders.push(newOrder);
      await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
      res.status(201).json({ message: 'Order created!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to process order' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
