const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

io.on("connection", (socket) => {
  console.log("New client:", socket.id);

  socket.on("update_calc", ({ sessionId, value }) => {
    socket.to(sessionId).emit("receive_calc", value);
  });

  socket.on("join_session", (sessionId) => {
    socket.join(sessionId);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(4000, () => console.log("Server running on port 4000"));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${3000}`);
});
