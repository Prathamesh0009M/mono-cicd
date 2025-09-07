import { WebSocketServer } from "ws";
import { prisma } from "@repo/db/client";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", async (socket) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: `User_${Date.now()}`, 
                password: Math.random().toString() // hash this in real apps
            }
        });
        socket.send(`Welcome ${user.username}!`);
    } catch (err) {
        console.error("Error creating user:", err);
        socket.send("Error creating your account.");
    }
});
