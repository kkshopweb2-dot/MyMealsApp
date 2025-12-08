import db from "../db.js";

// ==========================
// GET ALL with Pagination and Search
// ==========================
export const getUserContactUpdates = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;

  let queryParams = [];
  let whereClause = "";

  if (search) {
    whereClause = `
      WHERE 
        order_no LIKE ? OR
        name LIKE ? OR
        email LIKE ? OR
        plan LIKE ? OR
        field_name LIKE ? OR 
        old_value LIKE ? OR 
        new_value LIKE ?
    `;
    const searchTerm = `%${search}%`;
    queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
  }

  const countSql = `SELECT COUNT(*) AS total FROM user_contact_updates ${whereClause}`;

  db.query(countSql, queryParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const sql = `
      SELECT * FROM user_contact_updates 
      ${whereClause} 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `;

    db.query(sql, [...queryParams, limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        total,
        totalPages,
        currentPage: page,
        limit,
        data: results,
      });
    });
  });
};

// ==========================
// CREATE
// ==========================
export const createUserContactUpdate = (req, res) => {
  const { orderNo, name, email, plan, oldPhone, newPhone } = req.body;

  if (!orderNo || !name || !email || !plan || !oldPhone || !newPhone) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = `
    INSERT INTO user_contact_updates 
    (user_id, order_no, name, email, plan, field_name, old_value, new_value, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [req.userId, orderNo, name, email, plan, "phone", oldPhone, newPhone, "pending"], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "User contact update created successfully",
      id: results.insertId,
    });
  });
};

// ==========================
// GET SINGLE
// ==========================
export const getUserContactUpdate = (req, res) => {
  const sql = "SELECT * FROM user_contact_updates WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0)
      return res.status(404).json({ error: "Update not found" });

    res.json(results[0]);
  });
};

// ==========================
// UPDATE
// ==========================
export const updateUserContactUpdate = (req, res) => {
  const { field_name, old_value, new_value, status } = req.body;

  const sql = `
    UPDATE user_contact_updates 
    SET field_name = ?, old_value = ?, new_value = ?, status = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(sql, [field_name, old_value, new_value, status, req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0)
      return res.status(404).json({
        error: "Update not found or you don't have permission to update it.",
      });

    res.json({ message: "Update updated successfully" });
  });
};

// ==========================
// DELETE
// ==========================
export const deleteUserContactUpdate = (req, res) => {
  const sql = "DELETE FROM user_contact_updates WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0)
      return res.status(404).json({
        error: "Update not found or you don't have permission to delete it.",
      });

    res.status(204).send();
  });
};
