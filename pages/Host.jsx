import React from 'react'
import {motion, AnimatePresence} from 'framer-motion'


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
    Host registration
    </motion.h1>
  
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-1 my-3 md:gap-32">
    <div>
    <form>
    
    <div className='my-8'>
    <input className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' type="name" name="" id="" placeholder='Enter Full name' />
    </div>
    <div className='my-8'>
    <input className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Phone number' />
    </div>
    <div className='my-8'>
    <select className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' name="name" id="">
    <option value="">Select Church</option>
    </select>           
    </div>
    <div className='my-8'>
    <input className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
    </div>
    <div className='my-8'>
    <input className=' bg-gradient-to-r from-purple-800 to-purple-400 text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72' type="button" value="Submit"  />

    </div>
 
 
<a href='/register' className='font-race text-white' sx={{ color: 'white' }}>Are You A Guest ?</a>
    </form>
    </div>
   
    </div>
    </div>
    </div>
    </motion.div>
    
  )
}
