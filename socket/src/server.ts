import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
});

io.on("connection", (socket: Socket) => {
    console.log("A user connected...");
});

httpServer.listen(8900);