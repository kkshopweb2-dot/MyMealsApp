import db from "../db.js";

// ===============================
// GET ALL (with Pagination + Search)
// ===============================
export const getPauseResumeMeals = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;
  const search = req.query.search || "";

  let whereClause = "WHERE user_id = ?";
  const values = [req.userId];

  if (search) {
    whereClause += `
      AND (
        order_no LIKE ? OR
        meal_type LIKE ? OR
        reason LIKE ? OR
        name LIKE ? OR
        email LIKE ? OR
        phone LIKE ? OR
        plan LIKE ?
      )
    `;
    const searchPattern = `%${search}%`;
    values.push(
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern
    );
  }

  const countSql = `SELECT COUNT(*) AS total FROM pause_resume_meals ${whereClause}`;
  const dataSql = `
    SELECT *
    FROM pause_resume_meals
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  const dataValues = [...values, limit, offset];

  db.query(countSql, values, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;

    db.query(dataSql, dataValues, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: results,
      });
    });
  });
};


// ===============================
// CREATE (Insert Multiple Rows)
// ===============================
export const createPauseResumeMeal = (req, res) => {
  const { order_no, name, email, phone, plan, meals } = req.body;

  if (
    !order_no ||
    !name ||
    !email ||
    !phone ||
    !plan ||
    !Array.isArray(meals) ||
    meals.length === 0
  ) {
    return res.status(400).json({
      error: "Order number, customer details, and meals array are required",
    });
  }

  const sql = `
    INSERT INTO pause_resume_meals 
    (user_id, order_no, name, email, phone, plan, start_date, end_date, reason, status, meal_type)
    VALUES ?
  `;

  const values = meals.map((meal) => [
    req.userId,
    order_no,
    name,
    email,
    phone,
    plan,
    meal.start_date,
    meal.end_date,
    meal.reason,
    meal.action,
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
// GET SINGLE
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
          error: "Record not found or unauthorized",
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
        error: "Record not found or unauthorized",
      });

    res.status(204).send();
  });
};
