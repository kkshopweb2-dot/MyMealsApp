import db from "../db.js";

export const getMeals = (req, res) => {
  db.query("SELECT * FROM meals", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getPlansList = (req, res) => {
  db.query("SELECT id as p_id, name as p_name, price as p_price FROM plans", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
