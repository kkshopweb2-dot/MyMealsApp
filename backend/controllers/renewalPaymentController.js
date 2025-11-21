import db from "../db.js";

export const getRenewalPayments = (req, res) => {
  const sql = "SELECT * FROM renewal_payments WHERE user_id = ? ORDER BY payment_date DESC";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const createRenewalPayment = (req, res) => {
  const { amount, payment_date, next_renewal_date, status } = req.body;
  if (!amount || !payment_date || !status) {
    return res.status(400).json({ error: "Amount, payment date, and status are required" });
  }
  const sql = "INSERT INTO renewal_payments (user_id, amount, payment_date, next_renewal_date, status) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [req.userId, amount, payment_date, next_renewal_date, status], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Renewal payment created successfully", id: results.insertId });
  });
};

export const getRenewalPayment = (req, res) => {
    const sql = "SELECT * FROM renewal_payments WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Payment not found" });
        res.json(results[0]);
    });
};

export const updateRenewalPayment = (req, res) => {
    const { amount, payment_date, next_renewal_date, status } = req.body;
    const sql = "UPDATE renewal_payments SET amount = ?, payment_date = ?, next_renewal_date = ?, status = ? WHERE id = ? AND user_id = ?";
    db.query(sql, [amount, payment_date, next_renewal_date, status, req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Payment not found or you don't have permission to update it." });
        res.json({ message: "Payment updated successfully" });
    });
};

export const deleteRenewalPayment = (req, res) => {
    const sql = "DELETE FROM renewal_payments WHERE id = ? AND user_id = ?";
    db.query(sql, [req.params.id, req.userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: "Payment not found or you don't have permission to delete it." });
        res.status(204).send();
    });
};
