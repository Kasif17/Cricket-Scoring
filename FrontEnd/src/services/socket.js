// import { io } from 'socket.io-client';

// const socket = io(import.meta.env.VITE_BACKEND_URL);

// export default socket;

import { io } from "socket.io-client";
const socket = io("http://localhost:5000"); // Update if your backend runs on a different port
export default socket;
