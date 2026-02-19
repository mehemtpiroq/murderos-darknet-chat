const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Yeni kanka bağlandı 💀');
  
  ws.on('message', (message) => {
    // Herkese broadcast et
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on('close', () => console.log('Kanka gitti...'));
});

// Basit health check için root endpoint
app.get('/', (req, res) => res.send('MurderOs DarkNet Relay çalışıyor kanka!'));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda dinliyor kanka!`);
});
