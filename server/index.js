const express = require('express');
const { Server } = require('ws');
const cors = require('cors');

const app = express();

app.use(cors('*'))

const PORT = 3000;

let counter = 0;

app.get('/api/random-string', (req, res) => {
    const randomString = Math.random().toString(36).substring(2, 12);
    res.json({ counter, randomString });
});

const server = app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

const wss = new Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    const sendData = () => {
        counter += 1;
        ws.send(JSON.stringify({ counter }));
    };

    const interval = setInterval(sendData, 2000);

    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});
