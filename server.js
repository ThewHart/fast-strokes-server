const WebSocket = require('ws');

// Use the port Render gives us, or 10000 locally
const PORT = process.env.PORT || 10000;
const wss = new WebSocket.Server({ port: PORT });

console.log(`Sketchy Friends Server is running on port ${PORT}`);

wss.on('connection', (ws) => {
  console.log('A family member connected!');

  // When a message comes in from Godot
  ws.on('message', (data) => {
    // Convert the data to a string so we can read it in the logs
    const message = data.toString();
    console.log('Received:', message);

    // Send the message to everyone else (the "Broadcast")
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('A family member disconnected.');
  });
});
