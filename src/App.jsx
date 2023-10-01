import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import { useState } from 'react';
import Host from "./pages/Host";
import Guest from "./pages/Guest";
import Login from "./pages/Login"
import '../src/index.css'

function App() {
  const [cursorX, setCursorX] = useState()
  const [cursorY, setCursorY] = useState()

  // window.addEventListener('mousemove', (e) =>{
  //   setCursorX(e.pageX)
  //   setCursorY(e.pageY)
  // })
  return (
    <>
     {/* <div className="cursor hidden"
        style={{
          left:cursorX + 'px',
          top:cursorY + 'px'
        }}
      ></div> */}
    <Routes>      
       <Route path="/" exact element={<Home/>}/>
      <Route path="/register" exact element={<Guest/>}/>
      <Route path="/host" exact element={<Host/>}/>
      <Route path="/login" exact element={<Login/>}/>
    </Routes>
   </>
  )
}

export default App
