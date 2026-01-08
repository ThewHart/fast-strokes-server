const WebSocket = require('ws');

// Use the port Render gives us, or 10000 for local testing
const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: port });

console.log(`Fast Strokes Server is running on port ${port}`);

wss.on('connection', (ws) => {
    console.log('A family member connected!');

    // When the server gets a message from a phone or TV...
    ws.on('message', (data) => {
        // ...it sends it to EVERYONE else connected.
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });

    ws.on('close', () => console.log('Someone disconnected.'));
});