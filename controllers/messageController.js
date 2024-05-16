// Logic xử lý các yêu cầu liên quan đến tin nhắn

// const db = require('../config/database');

// // Hàm để lấy tất cả tin nhắn từ cơ sở dữ liệu
// exports.getAllMessages = (req, res) => {
//     db.query('SELECT * FROM messages', (err, results) => {
//         if (err) {
//             console.error('Error fetching messages:', err);
//             res.status(500).json({ error: 'Error fetching messages' });
//             return;
//         }
//         res.status(200).json(results);
//     });
// };
