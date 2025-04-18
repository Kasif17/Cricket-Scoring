require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const matchRoutes = require('./routes/matchRoutes');
const { init } = require('./socket');

// Initialize express app
const app = express();
const server = http.createServer(app);

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Socket.IO
const io = init(server);

// Inject `io` into every request
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use('/api/matches', matchRoutes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
