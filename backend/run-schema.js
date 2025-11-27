
import mysql from "mysql";
import fs from "fs";

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "mymealsdb",
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database!");

  const schema = fs.readFileSync("backend/schema.sql", "utf8");

  db.query(schema, (err, results) => {
    if (err) {
      console.error("❌ Error executing schema:", err.message);
      db.end();
      process.exit(1);
    }
    console.log("✅ Database schema updated successfully!");
    db.end();
  });
});
