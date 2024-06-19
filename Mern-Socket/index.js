import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";


const app = express();

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});


io.on('connection', (socket) => {
    console.log("connected to socket io");
    
    socket.on('send-message', ({message, roomid}) => {
        let skt = socket.broadcast;
        skt = roomid ? skt.to(roomid) : skt;
        console.log(roomid);
        skt.emit('message-from-server', {message});
    })

    socket.on('typing-started', ({roomid}) => {
        let skt = socket.broadcast;
        skt = roomid ? skt.to(roomid) : skt;
        skt.emit('typing-started-from-server')
    })

    socket.on('typing-stoped', ({roomid}) => {
        let skt = socket.broadcast;
        skt = roomid ? skt.to(roomid) : skt;
        skt.emit('typing-stoped-from-server');
    })

    socket.on('join-room', ({roomId}) => {
        socket.join(roomId);
        console.log("joinId: ", roomId);
        console.log("joining room");
    })
    
    socket.on('disconnect', () => {
        console.log("user left ");
    });
});


httpServer.listen(3000, () => {
    console.log("server is running at port 3000");
})
