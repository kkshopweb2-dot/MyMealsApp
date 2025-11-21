import db from "../db.js";

export const getPlans = (req, res) => {
  db.query("SELECT * FROM plans", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
