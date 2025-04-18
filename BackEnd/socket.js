const { Server } = require('socket.io');

let io;

const init = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // You can restrict to your frontend origin
      methods: ['GET', 'POST']
    }
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
};

module.exports = { init, getIO };



// const socketIO = require('socket.io');

// let io;

// module.exports = {
//   init: (server) => {
//     io = socketIO(server, {
//       cors: {
//         origin: '*',
//         methods: ['GET', 'POST'],
//       },
//     });

//     io.on('connection', (socket) => {
//       console.log('Client connected:', socket.id);
//     });

//     return io;
//   },

//   getIO: () => {
//     if (!io) {
//       throw new Error('Socket.io not initialized!');
//     }
//     return io;
//   },
// };
