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