import express from "express";
import dotenv from "dotenv";
import { connectDB, disconnectDB } from "./src/database/db.js";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();

// Connect to MongoDB
// connectDB();

// Middleware
app.use(express.json());

// Static files (if needed)
app.use(express.static("public"));

// Routes

// Start the server

const server = http.createServer(app);
const io = new Server(server);

const users = {}; // Map socket.id -> username
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Handle User joins a chat room
  socket.on("join", (username) => {
    console.log(`${username} joined the chat`);
    users[socket.id] = username;
    let data = {
      username,
      message: `${username} has joined the chat`,
    };
    socket.broadcast.emit("message", data);
    // Optionally, send the current user mapping to all clients
    io.emit("userList", users);
  });

  // Handle User sends a message
  socket.on("message", (data) => {
    console.log(`Message from ${data.username}: ${data.message}`);
    socket.broadcast.emit("message", data);
  });

  // Handle User disconnects (leaves the chat room)
  socket.on("disconnect", () => {
    const username = users[socket.id];
    console.log("Client disconnected:", socket.id, username);
    if (username) {
      delete users[socket.id];
      let data = {
        username,
        message: `${username} has left the chat`,
      };
      socket.broadcast.emit("message", data);
      // Send the updated user mapping to all clients
      io.emit("userList", users);
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// // Handle different Exceptions and Rejections
// // Unhandled promise rejections (e.g. missing await on DB connect)
// process.on("unhandledRejection", (err) => {
//   console.error("Unhandled Rejection:", err);
//   server.close(async () => {
//     await disconnectDB();
//     process.exit(0);
//   });
// });

// // Uncaught synchronous exceptions
// process.on("uncaughtException", async (err) => {
//   console.error("Uncaught Exception:", err);
//   await disconnectDB();
//   process.exit(0);
// });

// // Cloud/container shutdown (Heroku, Docker, PM2...)
// process.on("SIGTERM", () => {
//   server.close(async () => {
//     await disconnectDB();
//     process.exit(0);
//   });
// });

// // Local shutdown (Ctrl+C, nodemon restarts)
// process.on("SIGINT", () => {
//   server.close(async () => {
//     await disconnectDB();
//     process.exit(0);
//   });
// });
