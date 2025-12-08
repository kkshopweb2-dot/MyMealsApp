import db from "../db.js";

// ==========================
// GET ALL with Pagination and Search
// ==========================
export const getDeliveryLocations = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = (page - 1) * limit;

  let queryParams = [req.userId];
  let whereClause = "WHERE user_id = ?";

  if (search) {
    whereClause += `
      AND (
        address_line_1 LIKE ? OR 
        address_line_2 LIKE ? OR 
        city LIKE ? OR 
        state LIKE ? OR 
        zip_code LIKE ? OR
        order_no LIKE ? OR
        name LIKE ? OR
        email LIKE ? OR
        phone LIKE ? OR
        plan LIKE ?
      )
    `;
    const searchTerm = `%${search}%`;
    queryParams = [
      ...queryParams,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
      searchTerm,
    ];
  }

  const countSql = `SELECT COUNT(*) AS total FROM delivery_locations ${whereClause}`;

  db.query(countSql, queryParams, (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    const sql = `
      SELECT * FROM delivery_locations 
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
export const createDeliveryLocation = (req, res) => {
  const {
    order_no,
    name,
    email,
    phone,
    plan,
    address_line_1,
    address_line_2,
    city,
    state,
    zip_code,
    is_default,
  } = req.body;

  if (!address_line_1 || !city || !state || !zip_code) {
    return res
      .status(400)
      .json({
        error: "Address line 1, city, state, and zip code are required",
      });
  }

  const insertLocation = () => {
    const sql = `
      INSERT INTO delivery_locations 
      (user_id, order_no, name, email, phone, plan, address_line_1, address_line_2, city, state, zip_code, is_default) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        req.userId,
        order_no,
        name,
        email,
        phone,
        plan,
        address_line_1,
        address_line_2,
        city,
        state,
        zip_code,
        is_default || false,
      ],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          message: "Delivery location created successfully",
          id: results.insertId,
        });
      }
    );
  };

  if (is_default) {
    const updateSql =
      "UPDATE delivery_locations SET is_default = false WHERE user_id = ?";
    db.query(updateSql, [req.userId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      insertLocation();
    });
  } else {
    insertLocation();
  }
};

// ==========================
// GET SINGLE
// ==========================
export const getDeliveryLocation = (req, res) => {
  const sql = "SELECT * FROM delivery_locations WHERE id = ? AND user_id = ?";
  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Delivery location not found" });

    res.json(results[0]);
  });
};

// ==========================
// UPDATE
// ==========================
export const updateDeliveryLocation = (req, res) => {
  const { address_line_1, address_line_2, city, state, zip_code, is_default } =
    req.body;

  const updateThisLocation = () => {
    const sql =
      "UPDATE delivery_locations SET address_line_1 = ?, address_line_2 = ?, city = ?, state = ?, zip_code = ?, is_default = ? WHERE id = ? AND user_id = ?";
    db.query(
      sql,
      [
        address_line_1,
        address_line_2,
        city,
        state,
        zip_code,
        is_default,
        req.params.id,
        req.userId,
      ],
      (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0)
          return res.status(404).json({
            error:
              "Delivery location not found or you don't have permission to update it.",
          });

        res.json({ message: "Delivery location updated successfully" });
      }
    );
  };

  if (is_default) {
    const updateSql =
      "UPDATE delivery_locations SET is_default = false WHERE user_id = ? AND id != ?";
    db.query(updateSql, [req.userId, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      updateThisLocation();
    });
  } else {
    updateThisLocation();
  }
};

// ==========================
// DELETE
// ==========================
export const deleteDeliveryLocation = (req, res) => {
  const sql = "DELETE FROM delivery_locations WHERE id = ? AND user_id = ?";
  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({
        error:
          "Delivery location not found or you don't have permission to delete it.",
      });

    res.status(204).send();
  });
};
