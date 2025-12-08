import db from "../db.js";

export const searchMeals = (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  const query = `
    SELECT * FROM meals 
    WHERE title LIKE ? OR description LIKE ?
  `;
  const searchQuery = `%${q}%`;

  db.query(query, [searchQuery, searchQuery], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
