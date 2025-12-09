import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import db from "../db.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, '..', 'uploads', 'transactions');

// Create uploads folder if missing
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, uploadDir);
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({storage});
export { upload };


// =========================
//   CREATE ORDER
// =========================

export const createOrder = (req, res) => {
  console.log("Incoming Order Body:", req.body);

  const {
    name,
    phone,
    email,
    deliveryTime,
    amount,
    transactionId,
    note,
    deliveryBoyName,
    deliveryBoyMobile,
    cashDate,
    cashTime,
    cashNote,
    cashPaidOption,
    primaryAddress,
    secondaryAddress,
    plan,
    plan_id,
    paymentMethod,
  } = req.body;

  // Basic validation
  if (!name || !phone || !primaryAddress || !plan || !paymentMethod) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const orderSql = `
    INSERT INTO orders 
      (name, phone, email, primary_address, secondary_address, 
       delivery_time, plan, plan_id, payment_method, status, total_amount)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)
  `;

  const orderValues = [
    name,
    phone,
    email,
    primaryAddress,
    secondaryAddress,
    deliveryTime,
    plan,
    plan_id === "null" ? null : plan_id,

    paymentMethod,
    amount,
  ];

  db.query(orderSql, orderValues, (err, results) => {

    if (err) {
      console.error("Error inserting order:", err);
      return res.status(500).json({ error: "Failed to create order", db_error: err });
    }

    const orderId = results.insertId;

    // ------------------------
    //   QR PAYMENT
    // ------------------------
    if (paymentMethod === 'QR') {
      const screenshotPath = req.file ? req.file.path : null;

      const qrSql = `
        INSERT INTO qr_payments 
          (order_id, amount, transaction_id, note, screenshot)
        VALUES (?, ?, ?, ?, ?)
      `;

      const qrValues = [
        orderId,
        amount,
        transactionId,
        note,
        screenshotPath,
      ];

      db.query(qrSql, qrValues, (err2) => {
        if (err2) {
          console.error("Error inserting QR payment:", err2);
          return res.status(500).json({ error: "Failed to create QR payment", db_error: err2 });
        }

        return res.json({ message: "Order placed successfully!", orderId });
      });
    }

    // ------------------------
    //   CASH PAYMENT
    // ------------------------
    else if (paymentMethod === 'Cash') {

      const cashSql = `
        INSERT INTO cash_payments
          (order_id, amount, paid_by, dname, dnum, pdate, note)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        cashSql,
        [
          orderId,
          amount,
          cashPaidOption,
          deliveryBoyName,
          deliveryBoyMobile,
          `${cashDate} ${cashTime}`,
          cashNote
        ],
        (err3) => {
          if (err3) {
            console.error("Error inserting cash payment:", err3);
            return res.status(500).json({ error: "Failed to create cash payment", db_error: err3 });
          }

          return res.json({ message: "Order placed successfully!", orderId });
        }
      );
    }

    else {
      return res.status(400).json({ error: "Invalid payment method" });
    }
  });
};


// =========================
//   GET ORDERS
// =========================

export const getOrders = (req, res) => {
  const sql = `
    SELECT o.id AS order_id, o.user_id, o.plan_id, o.status, o.total_amount, 
           om.meal_id, om.quantity, m.name AS meal_name
    FROM orders o
    LEFT JOIN order_meals om ON o.id = om.order_id
    LEFT JOIN meals m ON om.meal_id = m.id
    WHERE o.user_id = ?
    ORDER BY o.id DESC
  `;

  db.query(sql, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const orders = [];
    const map = new Map();

    results.forEach((row) => {
      if (!map.has(row.order_id)) {
        map.set(row.order_id, {
          order_id: row.order_id,
          user_id: row.user_id,
          plan_id: row.plan_id,
          status: row.status,
          total_amount: row.total_amount,
          meals: [],
        });
        orders.push(map.get(row.order_id));
      }

      if (row.meal_id) {
        map.get(row.order_id).meals.push({
          meal_id: row.meal_id,
          name: row.meal_name,
          quantity: row.quantity,
        });
      }
    });

    res.json(orders);
  });
};
