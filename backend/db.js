import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",   
  port: 3306,          
  user: "root",
  password: "",
  database: "mymealsdb",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

export default db;
