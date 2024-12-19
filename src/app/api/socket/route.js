import { WebSocketServer } from 'ws';
import { NextResponse } from "next/server";
let ws;

export async function GET(request) {

  if (!ws) {
    ws = new WebSocketServer({ noServer: true });
    console.log(ws,"web socket")
    ws.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('message', (message) => {
        console.log('Received:', message);
        socket.send(`Echo: ${message}`);
      });

      socket.on('close', (code, reason) => {
        console.log(`Connection closed. Code: ${code}, Reason: ${reason}`);
      });
    

      socket.send('Welcome to the WebSocket server!');
    });

    console.log('WebSocket server initialized');
  }else{
    console.log('fnoer')
  }

  return new NextResponse('WebSocket server is ready');
};
