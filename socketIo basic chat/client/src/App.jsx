import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/Home';
import Header from './components/Header';
import Chatwindow from './components/Chatwindow';
import Room from './components/Room';

export default function App() {


  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Chatwindow />} />
        <Route path='/chat/:roomid' element={<Home />} />
        <Route path='/room/:roomid' element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}
