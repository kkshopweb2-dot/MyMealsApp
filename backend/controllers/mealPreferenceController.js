import db from "../db.js";

// ===========================================
// GET ALL WITH PAGINATION (10 PER PAGE)
// ===========================================
export const getMealPreferences = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || ""; // Added search query

  let offset;
  if (limit === -1) {
    offset = 0;
  } else {
    offset = (page - 1) * limit;
  }

  const queryParams = [];
  let whereClause = "";

  if (search) {
    whereClause = `
      WHERE 
        mp.order_no LIKE ? OR 
        mp.name LIKE ? OR 
        mp.email LIKE ? OR 
        mp.plan LIKE ? OR 
        mp.meal_type LIKE ?
    `;
    const searchTerm = `%${search}%`;
    queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
  }

  const countSql = `SELECT COUNT(*) AS total FROM meal_preferences AS mp ${whereClause}`;

  let dataSql = `
    SELECT
      mp.*
    FROM
      meal_preferences AS mp
    ${whereClause}
    ORDER BY
      mp.id DESC
  `;

  const limitParams = [];
  if (limit !== -1) {
    dataSql += `
      LIMIT ? OFFSET ?
    `;
    limitParams.push(limit, offset);
  }

  // Step 1: Count total rows
  db.query(countSql, queryParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = limit === -1 ? 1 : Math.ceil(total / limit);

    // Step 2: Fetch paginated items
    db.query(dataSql, [...queryParams, ...limitParams], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        page: limit === -1 ? 1 : page,
        limit: limit === -1 ? total : limit,
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
  const {
    user_id,
    order_no,
    name,
    email,
    plan,
    effective_from,
    meal_type,
    preference_details,
    is_active,
  } = req.body;

  const sql = `
    INSERT INTO meal_preferences 
    (user_id, order_no, name, email, plan, effective_from, meal_type, preference_details, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      user_id,
      order_no,
      name,
      email,
      plan,
      effective_from,
      meal_type,
      preference_details,
      is_active,
    ],
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
// ... rest of the file is unchanged

// ===========================================
// GET SINGLE RECORD
// ===========================================
export const getMealPreference = (req, res) => {
  const sql = "SELECT * FROM meal_preferences WHERE id = ?";

  db.query(sql, [req.params.id], (err, results) => {
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
  const {
    meal_type,
    preference_details,
    is_active
  } = req.body;

  const sql = `
    UPDATE meal_preferences
    SET meal_type = ?, preference_details = ?, is_active = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [meal_type, preference_details, is_active, req.params.id],
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
  const sql = "DELETE FROM meal_preferences WHERE id = ?";

  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0)
      return res.status(404).json({
        error:
          "Meal preference not found or you don't have permission to delete it.",
      });

    res.status(204).send();
  });
};
