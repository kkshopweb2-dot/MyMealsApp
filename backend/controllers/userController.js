import db from "../db.js";

export const getUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, phone FROM users", // removed created_at
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
