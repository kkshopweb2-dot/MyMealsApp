
import multer from "multer";
import path from "path";
import db from "../db.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, "uploads/transactions");
  },
  filename: function(req, file, cb){
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // keep file extension
  }
});
const upload = multer({storage});
export { upload };

export const createOrder = (req, res) => {
  console.log(req.body);
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
    paymentMethod,
  } = req.body;

  // Basic validation
  if (!name || !phone || !primaryAddress || !plan || !paymentMethod) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const orderSql = `
    INSERT INTO users (name, phone, email, primary_address, secondary_address, delivery_time, plan, payment_method, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `;

  const orderValues = [
    name,
    phone,
    email,
    primaryAddress,
    secondaryAddress,
    deliveryTime,
    plan,
    paymentMethod,
  ];

  db.query(orderSql, orderValues, (err, results) => {
    if (err) {
      console.error("Error inserting order:", err);
      return res.status(500).json({ error: "Failed to create order", db_error: err });
    }

    const orderId = results.insertId;

    if (paymentMethod === 'QR') {
      const screenshotPath = req.file ? req.file.path : null;

      const qrSql = `
        INSERT INTO qr_payments (order_id, amount, transaction_id, note, screenshot)
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
        res.json({ message: "Order placed successfully!", orderId });
      });
    } else if (paymentMethod === 'Cash') {
      const cashSql = `INSERT INTO cash_payments(id, amount, paid_by, dname, dnum, pdate, note) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(cashSql, [orderId, amount, cashPaidOption, deliveryBoyName, deliveryBoyMobile, cashDate+' '+cashTime, cashNote], (err3) => {
        if (err3) {
          console.error("Error inserting cash payment:", err3);
          return res.status(500).json({ error: "Failed to create cash payment", db_error: err3 });
        }
        res.json({ message: "Order placed successfully!", orderId });
      });
    } else {
      res.json({ message: "Order placed successfully!", orderId });
    }
  });
};

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
