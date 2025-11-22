import db from "../db.js";

export const getPauseResumeMeals = (req, res) => {
  const sql = "SELECT * FROM pause_resume_meals WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createPauseResumeMeal = (req, res) => {
  const { order_no, start_date, end_date, reason, status } = req.body;
  if (!start_date || !status) {
    return res.status(400).json({ error: "Start date and status are required" });
  }
  const sql = "INSERT INTO pause_resume_meals (user_id, order_no, start_date, end_date, reason, status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sql, [req.userId, order_no, start_date, end_date, reason, status], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Pause/resume record created successfully", id: results.insertId });
  });
};

export const getPauseResumeMeal = (req, res) => {
    const sql = "SELECT * FROM pause_resume_meals WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Record not found" });
        res.json(results[0]);
    });
};

export const updatePauseResumeMeal = (req, res) => {
    const { start_date, end_date, reason, status } = req.body;
    const sql = "UPDATE pause_resume_meals SET start_date = ?, end_date = ?, reason = ?, status = ? WHERE id = ? AND user_id = ?";
    db.query(sql, [start_date, end_date, reason, status, req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Record not found or you don't have permission to update it." });
        res.json({ message: "Record updated successfully" });
    });
};

export const deletePauseResumeMeal = (req, res) => {
    const sql = "DELETE FROM pause_resume_meals WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Record not found or you don't have permission to delete it." });
        res.status(204).send();
    });
};
