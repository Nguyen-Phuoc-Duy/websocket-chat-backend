//messageRouter.js
const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Route để gửi tin nhắn mới
router.post("/", (req, res) => {
  // Kiểm tra xem req.body có tồn tại không
  if (!req.body) {
    return res.status(400).json({ message: "Request body is empty" });
  }

  const { username, message } = req.body;

  // Kiểm tra xem username và message có tồn tại không
  if (!username || !message) {
    return res
      .status(400)
      .json({ message: "Username and message are required" });
  }

  // Tạo câu truy vấn để chèn tin nhắn vào cơ sở dữ liệu
  const insertMessageQuery = `INSERT INTO messages (username, message) VALUES (?, ?)`;
  const values = [username, message];

  // Thực thi câu truy vấn
  db.query(insertMessageQuery, values, (err, result) => {
    if (err) {
      console.error("Error inserting message:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Trả về phản hồi thành công nếu không có lỗi
    res.status(201).json({ message: "Message sent successfully" });
  });
});

// Route để lấy tất cả tin nhắn từ cơ sở dữ liệu
router.get("/", (req, res) => {
  // Tạo câu truy vấn để lấy tất cả tin nhắn từ cơ sở dữ liệu
  const selectMessagesQuery = `SELECT * FROM messages`;

  // Thực thi câu truy vấn
  db.query(selectMessagesQuery, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    // Trả về danh sách tin nhắn nếu không có lỗi
    res.status(200).json(results);
  });
});

module.exports = router;
