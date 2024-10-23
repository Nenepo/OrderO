import fs from 'node:fs/promises';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Check the path based on your deployment structure
      const meals = await fs.readFile('./data/available-meals.json', 'utf8');
      res.status(200).json(JSON.parse(meals));
    } catch (error) {
      console.error("Error reading meals:", error); // Log the error to see what went wrong
      res.status(500).json({ message: 'Failed to fetch meals', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
