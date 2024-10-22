import { promises as fs } from 'node:fs';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const meals = await fs.readFile('../data/available-meals.json', 'utf8');
      res.status(200).json(JSON.parse(meals));
    } catch (error) {
      res.status(500).json({ message: 'Failed to load meals' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
