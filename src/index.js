const path = require('path');
const express = require('express');
const app =express();
const socketio =require('socket.io');
const http = require('http');
const getreply =require('./botreply');


const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname,'../public');
const server = http.createServer(app);
const io = socketio(server);



io.on('connection',(socket)=>{
socket.broadcast.emit('welcome',"New user joined");

socket.on('message',(msg,ackcallback)=>{

    try
    {
        getreply('test3-jookhc',msg).then((reply)=>{
        socket.emit('messageReceived',reply);
        ackcallback(undefined);
        });
    }
    catch(e)
    {
        ackcallback();
    }
})

socket.on("disconnect",()=>io.emit('bye',"User has left"));

});

app.use(express.static(publicDirPath));

server.listen(port,()=>{
    console.log("Listening on port", port);
});