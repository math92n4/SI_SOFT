import { WebSocket } from "ws";

const wsClient = new WebSocket("ws://localhost:8080");

wsClient.on("open", () => {
    wsClient.send("Sending client msg from Node.js");

    wsClient.on("message", (message) =>{
        console.log(`Recieved message from the server: ${message}`);

        //wsClient.close();
    });
});