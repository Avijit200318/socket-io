import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { IconButton, InputAdornment, InputLabel, Typography } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from "@mui/icons-material/Send";
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client"


export default function Home() {
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);
    const [typing, setTyping] = useState(false);
    const [typingTimeOut, setTypingTimeOut] = useState(null);
    const params = useParams();


    useEffect(() => {
        setSocket(io('http://localhost:3000'));
    
    }, []);

    useEffect(() => {
        if (socket) {
          socket.emit('join-room', { roomId: params.roomid });
        }else{
            console.log("socket is not ready");
        }
      }, [socket, params]);

    useEffect(() => {
        if (socket) {
            socket.on('message-from-server', (data) => {
                setChat((prev) => [...prev, { message: data.message, recived: true }]);
            })

            socket.on('typing-started-from-server', () => {
                setTyping(true);
            })

            socket.on('typing-stoped-from-server', () => {
                setTyping(false);
            })
        }
    }, [socket]);

    const handleForm = (e) => {
        e.preventDefault();
        socket.emit('send-message', { message, roomid: params.roomid });
        setChat((prev) => [...prev, { message, recived: false }]);
        setMessage('');
    };

    const handleInput = (e) => {
        setMessage(e.target.value);
        socket.emit('typing-started', {roomid: params.roomid});

        if (typingTimeOut) clearTimeout(typingTimeOut);

        setTypingTimeOut(setTimeout(() => {
            socket.emit('typing-stoped', {roomid: params.roomid});
        }, 1000));
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ padding: 2, marginTop: 10, width: '60%', background: 'gray', color: 'white' }}>
            {params && <Typography>Room: {params.roomid}</Typography>}
                <Container>
                    <Box sx={{ marginBottom: 5 }}>
                        {
                            chat.map((data, index) => (
                                <Typography sx={{ textAlign: data.recived ? 'left' : 'right' }} key={index}>{data.message}</Typography>
                            ))
                        }
                    </Box>
                    <Box component="form" onSubmit={handleForm}>
                        {typing && (
                            <InputLabel sx={{ color: 'white' }} shrink htmlFor="message-input">
                                Typing...
                            </InputLabel>
                        )}
                        <OutlinedInput
                            sx={{ backgroundColor: 'white' }}
                            fullWidth
                            label="Write your message"
                            size='small'
                            value={message}
                            placeholder='Write your message'
                            onChange={handleInput}
                            id='message-input'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton type="submit"
                                        aria-label="toggle password visibility"
                                        edge="end"
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </Box>
                </Container>
            </Card>
        </Box>
    )
}
