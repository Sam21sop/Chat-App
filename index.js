import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';


const app = express();

// create server using http
const server = http.createServer(app);

// create a socket server
const io = new Server(server, {
    cors:{
        origin:"*",
        methods:["GET", "POST"]
    }
});

// use socket event
io.on('connection', (socket) => {
    console.log("connection established.");

    
    // getting user data
    socket.on("join", (data) => {
        socket.username = data;
    });


    // new message event listner
    socket.on("new_message", (message)=>{
        // create object
        let userMessage = {
            username : socket.username,
            message : message
        } 

        // broadcast the message to all the client 
        socket.broadcast.emit("broadcast_message", userMessage);
    });


    socket.on('disconnect', ()=>{
        console.log("disconnected.");
    });
});


export default server;