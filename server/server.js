const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("A new user just connected");

  //this sends to the new user who has joined
   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));

     //this sends to every one who is connected
      socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message, callback) => {
        console.log("createMessage", message);

        //this sends to every one even the sender
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is the server:');

        //this sends to every one except the sender
       /*socket.broadcast.emit('newMessage', generateMessage(message.from, message.text))*/
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
  })