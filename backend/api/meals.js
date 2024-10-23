import fs from 'node:fs/promises';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const meals = await fs.readFile('../data/available-meals.json', 'utf8');
      res.status(200).json(JSON.parse(meals));
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch meals.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}