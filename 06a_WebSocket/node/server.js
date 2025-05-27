import { WebSocketServer } from "ws";

const port = 8080;

const server = new WebSocketServer({ port: port });

server.on("connection", (ws) => {
    
    console.log("New connection: ", server.clients.size);

    ws.on("message", (message) => {
        console.log(`Message from client: ${message}`);

        server.clients.forEach((client) => {
            client.send(String(message));
        });
    });

    ws.on("close", () => {
        console.log("Client disconnected: ", server.clients.size);
    });
});

