
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

  const seeds = fs.readFileSync("backend/seeds.sql", "utf8");

  db.query(seeds, (err, results) => {
    if (err) {
      console.error("❌ Error executing seeds:", err.message);
      db.end();
      process.exit(1);
    }
    console.log("✅ Database seeded successfully!");
    db.end();
  });
});
