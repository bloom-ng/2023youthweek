import HeroImage from '../src/assets/banner.jpg'
import { Link } from 'react-router-dom'
import '../src/index.css'
import { motion } from 'framer-motion';
function Home() {
  
  return (
    <motion.div
     initial= {{opacity:0}}
     animate = {{opacity:1}}
     exit={{opacity:0}}
     transition={{duration: 1}}
    >
    <div>
     
        <div className='px-10 md:px-20 flex flex-col justify-center items-center bg-gradient-to-r from-[#360023] to-[#0e063a] h-screen w-screen'>
       
      
       
       <div className="flex flex-col justify-center items-center">
       <motion.h1
      initial={{y:-1000}}
      animate={{y:0}}
      transition={{
        duration:"2",
        delay: "0.5"

      }}
      
    >
         <img className='mb-8 object-fit w-96 h-62 md:w-[500px]  md:h-[500px] shadow-md shadow-purple-100/30' src={HeroImage} alt="" srcset="" />
      </motion.h1>

         </div>
         
         
         <div className=" space-x-3 md:flex md:space-x-10 md:mt-3">
       
         <Link to="/register" className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-lg shadow-sm font-race '>Guest</Link>
    
    
    <Link to="/host" className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-lg shadow-sm font-race '>Host</Link>
 
      
       
       </div>
       
       
       {/* <div className="flex justify-between flex-row px-2 md:hidden">
    
       <Link to="/register" className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm '>Guest</Link>
    
    
       <Link to="/register" className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm '>Host</Link>
    
       </div> */}
       
       </div>
    </div>
    </motion.div>
  )
}

export default Home