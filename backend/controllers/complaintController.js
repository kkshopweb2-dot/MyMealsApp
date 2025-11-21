import db from "../db.js";

export const getComplaints = (req, res) => {
  const sql = "SELECT * FROM complaints WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createComplaint = (req, res) => {
  const { subject, description } = req.body;
  if (!subject || !description) {
    return res.status(400).json({ error: "Subject and description are required" });
  }
  const sql = "INSERT INTO complaints (user_id, subject, description, status) VALUES (?, ?, ?, ?)";
  db.query(sql, [req.userId, subject, description, 'pending'], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Complaint created successfully", id: results.insertId });
  });
};

export const getComplaint = (req, res) => {
    const sql = "SELECT * FROM complaints WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Complaint not found" });
        res.json(results[0]);
    });
};

export const updateComplaint = (req, res) => {
    const { subject, description, status } = req.body;
    const sql = "UPDATE complaints SET subject = ?, description = ?, status = ? WHERE id = ? AND user_id = ?";
    db.query(sql, [subject, description, status, req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Complaint not found or you don't have permission to update it." });
        res.json({ message: "Complaint updated successfully" });
    });
};

export const deleteComplaint = (req, res) => {
    const sql = "DELETE FROM complaints WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Complaint not found or you don't have permission to delete it." });
        res.status(204).send();
    });
};
