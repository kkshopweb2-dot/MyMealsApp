import db from "../db.js";

// ===========================================
// GET ALL WITH PAGINATION (10 PER PAGE)
// ===========================================
export const getMealPreferences = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // <--- Show 10 records per page
  const offset = (page - 1) * limit;

  const countSql =
    "SELECT COUNT(*) AS total FROM meal_preferences WHERE user_id = ?";

  const dataSql = `
    SELECT * FROM meal_preferences
    WHERE user_id = ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;

  // Step 1: Count total rows
  db.query(countSql, [req.userId], (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Step 2: Fetch paginated items
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

// ===========================================
// CREATE
// ===========================================
export const createMealPreference = (req, res) => {
  const { order_no, meal_type, preference_details, is_active } = req.body;

  const sql = `
    INSERT INTO meal_preferences 
    (user_id, order_no, meal_type, preference_details, is_active)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [req.userId, order_no, meal_type, preference_details, is_active],
    (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: "Meal preference created successfully",
        id: results.insertId,
      });
    }
  );
};

// ===========================================
// GET SINGLE RECORD
// ===========================================
export const getMealPreference = (req, res) => {
  const sql = "SELECT * FROM meal_preferences WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(404).json({ error: "Meal preference not found" });

    res.json(results[0]);
  });
};

// ===========================================
// UPDATE
// ===========================================
export const updateMealPreference = (req, res) => {
  const { meal_type, preference_details, is_active } = req.body;

  const sql = `
    UPDATE meal_preferences
    SET meal_type = ?, preference_details = ?, is_active = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [meal_type, preference_details, is_active, req.params.id, req.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.affectedRows === 0)
        return res.status(404).json({
          error:
            "Meal preference not found or you don't have permission to update it.",
        });

      res.json({ message: "Meal preference updated successfully" });
    }
  );
};

// ===========================================
// DELETE
// ===========================================
export const deleteMealPreference = (req, res) => {
  const sql =
    "DELETE FROM meal_preferences WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0)
      return res.status(404).json({
        error:
          "Meal preference not found or you don't have permission to delete it.",
      });

    res.status(204).send();
  });
};
