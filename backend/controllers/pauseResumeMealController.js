import db from "../db.js";

// ===============================
// GET ALL (with Pagination)
// ===============================
export const getPauseResumeMeals = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;  // Show 10 records per page
  const offset = (page - 1) * limit;

  const countSql = "SELECT COUNT(*) AS total FROM pause_resume_meals WHERE user_id = ?";
  const dataSql = `
    SELECT * FROM pause_resume_meals 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `;

  // Get total rows
  db.query(countSql, [req.userId], (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Get paginated data
    db.query(dataSql, [req.userId, limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        page,
        limit,
        total,
        totalPages,
        data: results,
      });
    });
  });
};

// ===============================
// CREATE (Insert Multiple Rows)
// ===============================
export const createPauseResumeMeal = (req, res) => {
  const { order_no, meals } = req.body;

  if (!order_no || !Array.isArray(meals) || meals.length === 0) {
    return res.status(400).json({ error: "Order number and a valid meals array are required" });
  }

  const sql = `
    INSERT INTO pause_resume_meals 
    (user_id, order_no, start_date, end_date, reason, status, meal_type) 
    VALUES ?
  `;

  const values = meals.map((meal) => [
    req.userId,
    order_no,
    meal.start_date,
    meal.end_date,
    meal.reason,
    meal.action, // Pause or Resume
    meal.meal_type,
  ]);

  db.query(sql, [values], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Pause/resume records created successfully",
      insertedCount: results.affectedRows,
    });
  });
};

// ===============================
// GET SINGLE RECORD
// ===============================
export const getPauseResumeMeal = (req, res) => {
  const sql = "SELECT * FROM pause_resume_meals WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Record not found" });

    res.json(results[0]);
  });
};

// ===============================
// UPDATE
// ===============================
export const updatePauseResumeMeal = (req, res) => {
  const { start_date, end_date, reason, status } = req.body;

  const sql = `
    UPDATE pause_resume_meals 
    SET start_date = ?, end_date = ?, reason = ?, status = ? 
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [start_date, end_date, reason, status, req.params.id, req.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.affectedRows === 0)
        return res.status(404).json({
          error: "Record not found or you don't have permission to update it.",
        });

      res.json({ message: "Record updated successfully" });
    }
  );
};

// ===============================
// DELETE
// ===============================
export const deletePauseResumeMeal = (req, res) => {
  const sql = "DELETE FROM pause_resume_meals WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0)
      return res.status(404).json({
        error: "Record not found or you don't have permission to delete it.",
      });

    res.status(204).send();
  });
};
