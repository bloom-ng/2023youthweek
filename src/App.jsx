import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import { useState } from 'react';
import Host from "./pages/Host";
import Register from "./pages/Register";
import '../src/index.css'

function App() {
  const [cursorX, setCursorX] = useState()
  const [cursorY, setCursorY] = useState()

  window.addEventListener('mousemove', (e) =>{
    setCursorX(e.pageX)
    setCursorY(e.pageY)
  })
  return (
    <>
     <div className="cursor"
        style={{
          left:cursorX + 'px',
          top:cursorY + 'px'
        }}
      ></div>
    <Routes>
      
       <Route path="/" exact element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/host" element={<Host/>}/>
      
    </Routes>
   </>
  )
}

export default App
