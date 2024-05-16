//server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware để phân tích cơ thể yêu cầu JSON

const server = http.createServer(app);
const io = socketIo(server);

// Kết nối đến các route liên quan đến tin nhắn
app.use('/api/messages', messageRoutes);

// Khi có kết nối mới từ client
io.on('connection', (socket) => {
    console.log('New client connected');

    // Xử lý sự kiện nhận tin nhắn mới
    socket.on('newMessage', (data) => {
        console.log('New message received:', data);
        // Gửi tin nhắn mới đến tất cả các client
        io.emit('newMessage', data);
    });

    // Khi client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
