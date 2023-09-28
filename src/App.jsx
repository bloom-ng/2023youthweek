import React from 'react'
import { Route, Routes } from "react-router-dom"
import Home from '../pages/Home'
import Host from "../pages/Host";
import Register from "../pages/Register";
import '../src/index.css'
function App() {
  return (

    <Routes>
       <Route path="/" element={<Home/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/host" element={<Host/>}/>
      
    </Routes>
   
  )
}

export default App
