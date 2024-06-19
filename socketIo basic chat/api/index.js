import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import sockets from "./socket/route.js";


const app = express();

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
});


io.on('connection', sockets);


httpServer.listen(3000, () => {
    console.log("server is running at port 3000");
})