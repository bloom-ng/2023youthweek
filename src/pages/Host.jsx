import React from 'react'
import {motion} from 'framer-motion'
import {AiTwotoneHome} from 'react-icons/ai'
import { Link } from 'react-router-dom';


export default function FramerAnimation() {
  return (
    <motion.div
     initial= {{opacity:0}}
     animate = {{opacity:1}}
     exit={{opacity:0}}
     transition={{duration: 1}}
    >
    <div className="px-10 md:px-20 flex flex-col justify-center items-center bg-gradient-to-r from-[#360023] to-[#0e063a] h-screen w-screen">
  
    <div className=' flex-col flex justify-center items-center py-4 '>
    <div className="flex justify-center text-2xl uppercase py-2 font-race items-center text-white font-semibold tracking-wide pt-4">
    <motion.h1
      initial={{y:100}}
      animate={{y:0}}
      transition={{
        duration:"2",
        delay: "0.5"

      }}
      
    >
      <Link to="/">
      <AiTwotoneHome size={30} className='inline mr-2'/></Link>
    Host registration
    </motion.h1>
  
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-1 my-3 md:gap-32">
    <div>
    <form>
    
    <div className='my-8'>
    <input className='bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72' type="name" name="" id="" placeholder='Enter Full name' />
    </div>
    <div className='my-8'>
    <input className='bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Phone number' />
    </div>
    <div className='my-8'>
    <select className='bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72' name="name" id="">
    <option value="">Select Church</option>
    </select>           
    </div>
    <div className='my-8'>
    <input className='bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
    </div>
    <div className='my-8'>
    <input className=' bg-gradient-to-r from-orange-500 to-purple-900 text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72' type="button" value="Submit"  />

    </div>
 
 
<a href='/register' className='flex justify-center items-center font-race text-white text-center' sx={{ color: 'white' }}>Are You A Guest ?</a>
    </form>
    </div>
   
    </div>
    </div>
    </div>
    </motion.div>
    
  )
}
