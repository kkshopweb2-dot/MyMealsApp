import db from "../db.js";

export const getOrderMeals = (req, res) => {
  // This should be scoped to a user, but for now, we get all
  db.query("SELECT * FROM order_meals", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
