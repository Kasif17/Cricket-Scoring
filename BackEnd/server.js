require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db');
const matchRoutes = require('./routes/matchRoutes');
const { init } = require('./socket');


const app = express();
const server = http.createServer(app);


connectDB();


app.use(cors());
app.use(express.json());

const io = init(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use('/api/matches', matchRoutes);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
