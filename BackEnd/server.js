require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Set to your frontend domain in production
    methods: ['GET', 'POST']
  }
});

connectDB();

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('joinMatch', (matchId) => {
    socket.join(matchId);
    console.log(`Socket ${socket.id} joined match ${matchId}`);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Attach io to app for access in controllers
app.set('io', io);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
