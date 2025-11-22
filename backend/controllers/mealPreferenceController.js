import db from "../db.js";

export const getMealPreferences = (req, res) => {
  const sql = `
    SELECT
      mp.id,
      mp.user_id,
      mp.meal_type,
      mp.preference_details,
      mp.is_active,
      mp.created_at,
      u.name,
      u.email,
      o.plan
    FROM meal_preferences mp
    LEFT JOIN users u ON mp.user_id = u.id
    LEFT JOIN orders o ON mp.order_no = o.order_no
    WHERE mp.user_id = ?
    ORDER BY mp.created_at DESC
  `;
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createMealPreference = (req, res) => {
  const { meal_type, preference_details, is_active } = req.body;
  if (!meal_type) {
    return res.status(400).json({ error: "Meal type is required" });
  }
  const sql = "INSERT INTO meal_preferences (user_id, meal_type, preference_details, is_active) VALUES (?, ?, ?, ?)";
  db.query(sql, [req.userId, meal_type, preference_details, is_active === undefined ? true : is_active], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Meal preference created successfully", id: results.insertId });
  });
};

export const getMealPreference = (req, res) => {
    const sql = "SELECT * FROM meal_preferences WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Meal preference not found" });
        res.json(results[0]);
    });
};

export const updateMealPreference = (req, res) => {
    const { meal_type, preference_details, is_active } = req.body;
    const sql = "UPDATE meal_preferences SET meal_type = ?, preference_details = ?, is_active = ? WHERE id = ? AND user_id = ?";
    db.query(sql, [meal_type, preference_details, is_active, req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Meal preference not found or you don't have permission to update it." });
        res.json({ message: "Meal preference updated successfully" });
    });
};

export const deleteMealPreference = (req, res) => {
    const sql = "DELETE FROM meal_preferences WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Meal preference not found or you don't have permission to delete it." });
        res.status(204).send();
    });
};
