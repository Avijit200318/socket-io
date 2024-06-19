import React from 'react'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import {v4 as uuidv4} from "uuid";

export default function Header() {
    const roomid = uuidv4();
  return (
    <Card sx={{marginTop: 5}}>
        <Link to='/'><Button variant='text'>Home</Button></Link>
        <Link to={`/chat/${roomid}`}><Button variant='text'>Chats</Button></Link>
        <Link to={`/room/`}><Button variant='text'>Room1</Button></Link>        
    </Card>
  )
}
