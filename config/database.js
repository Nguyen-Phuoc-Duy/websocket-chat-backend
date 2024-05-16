// File cấu hình kết nối đến cơ sở dữ liệu MySQL
//database.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "websocket_chat",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to database");
});

module.exports = db;
