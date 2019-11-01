const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("A new user just connected");

  //this sends to the new user who has joined
   socket.emit('newMessage', {
        from: "Admin",
        text: "Welcome to the chat app!",
        createAt: new Date().getTime()
     });

     //this sends to every one who is connected
      socket.broadcast.emit('newMessage', {
            from: "Admin",
            text: "New user joined",
            createAt: new Date().getTime()
         })

    socket.on('createMessage', (message) => {
        console.log("createMessage", message);
        //this sends to every one even the sender
        io.emit('newMessage', {
           from: message.from,
           text: message.text,
           createAt: new Date().getTime()
        })
        //this sends to every one except the sender
       /*socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
         })*/
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected.');
    });
});

server.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
  })