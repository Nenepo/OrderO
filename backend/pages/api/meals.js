import fs from 'node:fs/promises';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Adjust the path to where available-meals.json is located
      const meals = await fs.readFile('../../data/available-meals.json', 'utf8');
      res.status(200).json(JSON.parse(meals));
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch meals' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
