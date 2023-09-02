const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
let onlineUsers = [];


const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname)));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('user joined', (username) => {
    if(onlineUsers.indexOf(username) === -1) {
      onlineUsers.push(username);
      socket.username = username;
      io.emit('update userlist', onlineUsers);
    }
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Send the message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    if(socket.username) {
      onlineUsers = onlineUsers.filter(user => user !== socket.username);
      io.emit('update userlist', onlineUsers);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
