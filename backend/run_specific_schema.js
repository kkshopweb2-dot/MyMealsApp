
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

  const sqlFile = process.argv[2];
  if (!sqlFile) {
    console.error("❌ Please provide a SQL file to run.");
    db.end();
    process.exit(1);
  }

  const sql = fs.readFileSync(sqlFile, "utf8");

  db.query(sql, (err, results) => {
    if (err) {
      console.error(`❌ Error executing ${sqlFile}:`, err.message);
      db.end();
      process.exit(1);
    }
    console.log(`✅ ${sqlFile} executed successfully!`);
    db.end();
  });
});
