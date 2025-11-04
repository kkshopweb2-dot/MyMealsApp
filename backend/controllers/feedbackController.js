import db from "../db.js";

export const getFeedbacks = (req, res) => {
  const sql = "SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createFeedback = (req, res) => {
  const { rating, comments } = req.body;
  const sql = "INSERT INTO feedback (user_id, rating, comments) VALUES (?, ?, ?)";
  db.query(sql, [req.userId, rating, comments], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Feedback created successfully", id: results.insertId });
  });
};

export const getFeedback = (req, res) => {
    const sql = "SELECT * FROM feedback WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Feedback not found" });
        res.json(results[0]);
    });
};

export const updateFeedback = (req, res) => {
    const { rating, comments } = req.body;
    const sql = "UPDATE feedback SET rating = ?, comments = ? WHERE id = ? AND user_id = ?";
    db.query(sql, [rating, comments, req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Feedback not found or you don't have permission to update it." });
        res.json({ message: "Feedback updated successfully" });
    });
};

export const deleteFeedback = (req, res) => {
    const sql = "DELETE FROM feedback WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Feedback not found or you don't have permission to delete it." });
        res.status(204).send();
    });
};
