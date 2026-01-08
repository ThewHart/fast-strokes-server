const WebSocket = require('ws');

// Use the port Render gives us, or 10000 for local testing
const port = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: port });

console.log(`Fast Strokes Server is running on port ${port}`);

// When a message comes in from a device
  ws.on('message', (data) => {
    console.log('Received: %s', data); // This is what puts it in the Render Log!
    
    // Send it to everyone else
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

    ws.on('close', () => console.log('Someone disconnected.'));
});
