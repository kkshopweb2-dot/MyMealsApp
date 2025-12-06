import db from "../db.js";
import multer from "multer";

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/profile");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const getUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, phone, image FROM users",
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

export const getUser = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT id, name, email, phone, image FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ message: "User not found" });
      res.json(results[0]);
    }
  );
};

export const updateUser = [
  upload.single("image"),
  (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    let image = req.file ? `uploads/profile/${req.file.filename}` : null;

    const fields = [];
    const params = [];

    if (name) {
      fields.push("name = ?");
      params.push(name);
    }
    if (email) {
      fields.push("email = ?");
      params.push(email);
    }
    if (phone) {
      fields.push("phone = ?");
      params.push(phone);
    }
    if (image) {
      fields.push("image = ?");
      params.push(image);
    }

    if (fields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    params.push(id);

    db.query(query, params, (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "User updated successfully" });
    });
  },
];
