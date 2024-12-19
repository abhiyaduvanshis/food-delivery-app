
'use client'
import { useEffect,useState } from 'react';
import io from 'socket.io-client';


export default function WebSocketClient() {

  const socket = io("http://localhost:5000")

  useEffect(() => {
    
    socket.on('connect',()=>{
      console.log(socket.id,'grrjng')
    })

    return ()=>{
      socket.disconnect()
    }

  }, []);

  return <div>WebSocket Client Example</div>;
}
