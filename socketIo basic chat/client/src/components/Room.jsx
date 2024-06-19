import React, { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Home from './Home';


export default function Room() {
  const params = useParams();

  useEffect(() => {
    if (socket) {
      socket.emit('join-room', { roomId: params.roomid });
    }
  }, [params]);

  return (
    <div>
      <Home />
    </div>
  )
}
