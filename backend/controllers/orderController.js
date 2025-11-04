import db from "../db.js";

export const createOrder = (req, res) => {
  const { plan_id, meals } = req.body;
  const user_id = req.userId;
  if (!user_id || !plan_id || !meals || !meals.length)
    return res.status(400).json({ error: "User, plan, and meals required" });

  const mealIds = meals.map((m) => m.meal_id);
  const placeholders = mealIds.map(() => "?").join(",");
  const sql = `SELECT id, price FROM meals WHERE id IN (${placeholders})`;

  db.query(sql, mealIds, (err, mealResults) => {
    if (err) return res.status(500).json({ error: err.message });

    let totalAmount = 0;
    mealResults.forEach((meal) => {
      const quantity = meals.find((m) => m.meal_id === meal.id)?.quantity || 1;
      totalAmount += meal.price * quantity;
    });

    const orderSql =
      "INSERT INTO orders (user_id, plan_id, status, total_amount) VALUES (?, ?, 'pending', ?)";
    db.query(orderSql, [user_id, plan_id, totalAmount], (err2, results) => {
      if (err2) return res.status(500).json({ error: err2.message });

      const orderId = results.insertId;
      const mealSql = "INSERT INTO order_meals (order_id, meal_id, quantity) VALUES ?";
      const mealValues = meals.map((m) => [orderId, m.meal_id, m.quantity || 1]);

      db.query(mealSql, [mealValues], (err3) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.json({ message: "Order placed successfully!", orderId, totalAmount });
      });
    });
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
