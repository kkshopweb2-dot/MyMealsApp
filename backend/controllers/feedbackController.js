import db from "../db.js";

/* GET ALL FEEDBACKS FOR USER */
export const getFeedbacks = (req, res) => {
  const sql = "SELECT * FROM feedback WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error while fetching feedbacks." });
    res.json(results);
  });
};

/* GET SINGLE FEEDBACK BY ID */
export const getFeedbackById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM feedback WHERE id = ? AND user_id = ?";
  db.query(sql, [id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error while fetching feedback." });
    if (results.length === 0) return res.status(404).json({ error: "Feedback not found or not authorized" });
    res.json(results[0]);
  });
};

/* CREATE FEEDBACK */
export const createFeedback = (req, res) => {
  const {
    orderNo,
    customer_name,
    phone_number,
    plan_name,
    overall_comments,
    selected_date,
    food_rating,
    food_comments,
    delivery_rating,
    delivery_comments,
    management_rating,
    management_comments,
  } = req.body;

  if (!orderNo || !customer_name || !overall_comments) {
    return res.status(400).json({ error: "Order number, customer name, and overall comments are required." });
  }

  const sql = `INSERT INTO feedback (
    user_id, order_no, customer_name, phone_number, plan_name, overall_comments,
    selected_date, food_rating, food_comments, delivery_rating, delivery_comments,
    management_rating, management_comments
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    req.userId,
    orderNo,
    customer_name,
    phone_number,
    plan_name || null,
    overall_comments,
    selected_date || null,
    food_rating || null,
    food_comments || null,
    delivery_rating || null,
    delivery_comments || null,
    management_rating || null,
    management_comments || null,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Database error while creating feedback - Message:", err.message);
      console.error("Database error while creating feedback - Code:", err.code);
      return res.status(500).json({ error: "Database error while creating feedback." });
    }
    res.status(201).json({ message: "Feedback created successfully", id: results.insertId });
  });
};

/* UPDATE FEEDBACK */
export const updateFeedback = (req, res) => {
  const { id } = req.params;
  const {
    overall_comments,
    food_rating,
    food_comments,
    delivery_rating,
    delivery_comments,
    management_rating,
    management_comments
  } = req.body;

  const sql = `UPDATE feedback SET 
    overall_comments = ?, 
    food_rating = ?, 
    food_comments = ?,
    delivery_rating = ?,
    delivery_comments = ?,
    management_rating = ?,
    management_comments = ?
    WHERE id = ? AND user_id = ?`;

  const values = [
    overall_comments,
    food_rating,
    food_comments,
    delivery_rating,
    delivery_comments,
    management_rating,
    management_comments,
    id,
    req.userId
  ];

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Feedback not found or not authorized" });
    res.json({ message: "Feedback updated successfully" });
  });
};

/* DELETE FEEDBACK */
export const deleteFeedback = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM feedback WHERE id = ? AND user_id = ?";
  db.query(sql, [id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ error: "Feedback not found or not authorized" });
    res.json({ message: "Feedback deleted successfully" });
  });
};
