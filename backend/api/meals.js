import fs from 'node:fs/promises';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Handle GET request for meals
  if (req.method === 'GET') {
    res.status(200).json([{ id: '1', name: 'Meal 1' }, { id: '2', name: 'Meal 2' }]);
    try {
      // Ensure the path is correct
      const meals = await fs.readFile('../data/available-meals.json', 'utf8'); // Adjust path as necessary
      res.status(200).json(JSON.parse(meals));
    } catch (error) {
      console.error('Error reading meals file:', error); // Log the error for debugging
      res.status(500).json({ message: 'Failed to fetch meals.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
