import React from 'react'
import HeroImage from '../src/assets/banner.jpg'
import LogoOne from '../src/assets/logoOne.jpg'
import  LogoTwo from '../src/assets/LogoTwo.jpg'

import { Link } from 'react-router-dom'
import '../src/index.css'
function Home() {
  return (
    <div>
        <div className='px-10 md:px-20 bg-gradient-to-r from-[#360023] to-[#0e063a] h-screen w-screen'>
       
       <nav className='p-8 flex justify-between items-center text-white'>
       <div className='font-bold text-xl md:text-2xl flex'>
         <img src={LogoOne} className='w-20 h-20'  alt="" />
         <img src={LogoTwo} className='w-20 h-20 mx-2' alt="" />
       </div>
         <div className='font-normal md:text-lg space-x-3'>
         <Link to="/register"> Register</Link>
         </div>
       </nav>
       
       <div className="flex flex-col justify-center items-center my-8">
         <img className='mb-8 object-fit w-96 h-62 md:w-[400px] md:h-[400px] shadow-md shadow-purple-100/30' src={HeroImage} alt="" srcset="" />
         <div className="hidden md:flex md:space-x-10 md:mt-8">
       
       <button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Guest</button>
       
       <button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Host</button>
       
       </div>
       
       </div>
       
       
       <div className="flex justify-between px-10 md:hidden">
    
       <button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Guest</button>
    
    
       <button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Host</button>
    
       </div>
       
       </div>
    </div>
  )
}

export default Home