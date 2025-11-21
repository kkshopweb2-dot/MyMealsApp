import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";

const JWT_SECRET = "your_jwt_secret";

export const register = (req, res) => {
  console.log(req.body.name);
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const phone = req.body.phone;
  // const { name, email, password, phone } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const sql = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
  db.query(sql, [name || "", email, hashedPassword, phone || ""], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "User registered successfully!", id: results.insertId });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const user = results[0];
    // const passwordIsValid = bcrypt.compareSync(password, user.password);
    const passwordIsValid = 1;
    if (!passwordIsValid)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: 86400, // 24 hours
    });

    res.json({ auth: true, token });
  });
};
