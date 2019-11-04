import { userInfo } from "os";

let socket = io();

socket.on('connect', () => {
    console.log('Connected to server.');
});
socket.on('disconnect', () => {
    console.log('disconnected from server.')
});

socket.on('newMessage', function (message){
    console.log("newMessage", message);
});

socket.emit('createMessage', {
    from: 'Ed',
    text: 'Hey'
}, function(message){
    console.log('Got it.', message);
});

document.querySelector('#submit-btn').addEventListener(click, function(e){
    e.preventDefault();
    
    socket.emit("createMessage",{
        from: "User",
        text: document.querySelector('input[name="message"]').value
    }, function(){

    });
});