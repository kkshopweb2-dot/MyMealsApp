import db from "../db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===========================================
// GET ALL WITH PAGINATION (10 PER PAGE)
// ===========================================
export const getRenewalPayments = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;  // <--- Show 10 records per page
  const offset = (page - 1) * limit;

  const countSql =
    "SELECT COUNT(*) AS total FROM renewal_payments WHERE user_id = ?";

  const dataSql = `
    SELECT * FROM renewal_payments
    WHERE user_id = ?
    ORDER BY payment_date DESC
    LIMIT ? OFFSET ?
  `;

  // Step 1: Get total count for pagination
  db.query(countSql, [req.userId], (err, countResult) => {
    if (err) return res.status(500).json({ error: err.message });

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // Step 2: Fetch paginated data
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
// CREATE RENEWAL PAYMENT
// ===========================================
export const createRenewalPayment = (req, res) => {
  const {
    orderNo,
    location,
    name,
    email,
    phone,
    address,
    plan,
    renewalMonth,
    amountPaid,
    transactionId,
    cashPaid,
    paymentMode,
    deliveryBoyName,
    deliveryBoyPhone,
    deliveryDate,
    deliveryTime,
    officeDate,
    officeTime,
    note,
  } = req.body;

  let screenshotPath = null;

  // Handle Screenshot Upload
  if (req.files && req.files.length > 0) {
    const file = req.files.find((f) => f.fieldname === "screenshot");
    if (file) {
      const uploadDir = path.join(__dirname, "../uploads");
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

      screenshotPath = path.join(
        uploadDir,
        `${Date.now()}_${file.originalname}`
      );

      fs.writeFileSync(screenshotPath, file.buffer);

      screenshotPath = `/uploads/${path.basename(screenshotPath)}`;
    }
  }

  const sql = `
    INSERT INTO renewal_payments (
      user_id, order_no, location, name, email, phone, address, 
      plan, renewal_month, amount_paid, transaction_id, cash_paid,
      payment_mode, delivery_boy_name, delivery_boy_phone, delivery_date,
      delivery_time, office_date, office_time, note, screenshot
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    req.userId,
    orderNo,
    location,
    name,
    email,
    phone,
    address,
    plan,
    renewalMonth,
    amountPaid,
    transactionId,
    cashPaid,
    paymentMode,
    deliveryBoyName,
    deliveryBoyPhone,
    deliveryDate,
    deliveryTime,
    officeDate,
    officeTime,
    note,
    screenshotPath,
  ];

  db.query(sql, values, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Renewal payment created successfully",
      id: results.insertId,
      screenshotUrl: screenshotPath,
    });
  });
};

// ===========================================
// GET SINGLE PAYMENT
// ===========================================
export const getRenewalPayment = (req, res) => {
  const sql = "SELECT * FROM renewal_payments WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ error: "Payment not found" });

    res.json(results[0]);
  });
};

// ===========================================
// UPDATE PAYMENT
// ===========================================
export const updateRenewalPayment = (req, res) => {
  const { amount, payment_date, next_renewal_date, status } = req.body;

  const sql = `
    UPDATE renewal_payments 
    SET amount = ?, payment_date = ?, next_renewal_date = ?, status = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(
    sql,
    [amount, payment_date, next_renewal_date, status, req.params.id, req.userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.affectedRows === 0)
        return res.status(404).json({
          error: "Payment not found or you don't have permission to update it.",
        });

      res.json({ message: "Payment updated successfully" });
    }
  );
};

// ===========================================
// DELETE PAYMENT
// ===========================================
export const deleteRenewalPayment = (req, res) => {
  const sql =
    "DELETE FROM renewal_payments WHERE id = ? AND user_id = ?";

  db.query(sql, [req.params.id, req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.affectedRows === 0)
      return res.status(404).json({
        error: "Payment not found or you don't have permission to delete it.",
      });

    res.status(204).send();
  });
};
