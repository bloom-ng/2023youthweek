import HeroImage from '../assets/banner.jpg'
import { Link } from 'react-router-dom'
import '../index.css'
import { motion } from 'framer-motion';
import { useState } from 'react';
import soundFile from '../assets/sound.mp3';

function Home() {
  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };
  const [cursorX, setCursorX] = useState()
  const [cursorY, setCursorY] = useState()

  window.addEventListener('mousemove', (e) => {
    setCursorX(e.pageX)
    setCursorY(e.pageY)
  })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      style={{ maxWidth: "100vw" }}
    >

      <div className='bg-gradient-to-r from-[#360023] to-[#0e063a] flex-col min-h-screen max-h-screen'>


        <div style={{
          backgroundImage: `url(${HeroImage})`,


        }} className=' flex bg-no-repeat bg-center  bg-contain'>



          <div className="flex justify-center">
            <motion.div
              initial={{ y: -1000 }}
              animate={{ y: 0 }}
              transition={{
                duration: "2",
                delay: "0.5"

              }}

              className={`flex items-end justify-center opacity-70 bg-no-repeat bg-center h-[80vh] w-[100vw] bg-contain`}>
            </motion.div>

            {/* <img className='mb-8 object-fit w-96 h-62 md:w-[500px]  md:h-[500px] shadow-md shadow-purple-100/30' src={} alt="" srcset="" /> */}
            


          </div>


          {/* <div className="flex justify-between flex-row px-2 md:hidden">
    
       <Link to="/register" className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm '>Guest</Link>
    
    
       <Link to="/register" className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm '>Host</Link>
    
       </div> */}

        </div>
        <div className=" space-x-3 md:flex md:space-x-10 md:mt-3 mb-14 bg-gray-200 bg-opacity-70  p-3 w-[100vw] flex justify-center">

              <Link to="/register" className='shadow-slate-800 shadow-xl text-white bg-gradient-to-r from-orange-500 to-purple-900 px-8 md:px-24 py-2 rounded-lg font-race' onClick={playSound}>Guest</Link>


              <Link to="/host" className='shadow-slate-800 shadow-xl text-white bg-gradient-to-r from-orange-500 to-purple-900 px-8 md:px-24 py-2 rounded-lg font-race ' onClick={playSound}>Host</Link>



            </div>
      </div>
    </motion.div>
  )
}

export default Home