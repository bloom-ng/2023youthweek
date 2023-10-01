import React from 'react'
import { motion } from 'framer-motion'
import { AiTwotoneHome } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { BsPlusCircleFill } from 'react-icons/bs'
import ApiService from '../services/ApiService';
import soundFile from '../assets/sound.mp3';


export default function FramerAnimation() {

  const [churches, setChurches] = React.useState([])
  const [newChurch, setNewChurch] = React.useState({ name: "" })
  const [host, setHost] = React.useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
    type: 1,
    church_id: 1,
  })
  const [guests, setGuests] = React.useState({
    name: "",
    email: "",
    phone: "",
    gender: "male",
    participants: 1,
    type: 1,
    church_id: 0,
  })


  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };


  const fetchChurches = async () => {
    try {
      let res = await ApiService.ChurchList();
      setChurches(res);
    } catch (error) {
      throw new Error(error)
    }
  }

  const createParticipant = async (e) => {
    try {
      e.target.value = "Processing";
      await ApiService.ParticipantCreate(host)
      setHost({ name: "", email: "", phone: "", gender: "male", type: 0, church_id: 1 })
      alert("Created")
      window.location.reload();
    } catch (error) {
      e.target.value = "Submit";
      throw new Error(error)
    }
    e.target.value = "Submit";
  }



  React.useEffect(() => {
    (
      async () => {
        await fetchChurches();
      }
    )()
  }, [])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-10 md:px-20 flex flex-col justify-center items-center bg-gradient-to-r from-[#360023] to-[#0e063a] h-screen w-screen">

        <div className=' flex-col flex justify-center items-center py-4 '>
          <div className="flex justify-center text-2xl uppercase py-2 font-race items-center text-white font-semibold tracking-wide pt-4">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{
                duration: "2",
                delay: "0.5"

              }}

            >
              <Link to="/">
                <AiTwotoneHome size={30} className='inline mx-8' /></Link>
              Host registration
            </motion.h1>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 my-3 md:gap-32">
            <div>
              <form>

                <div className='my-8'>
                  <input onChange={e => setHost(prev => ({...prev, name: e.target.value}))} 
                    className='bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72' type="text" name="" id="" placeholder='Enter Full name' />
                </div>
                <div className='my-8'>
                  <input onChange={e => setHost(prev => ({...prev, phone: e.target.value}))} 
                    className='bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Phone number' />
                </div>
               

                <div className='my-8'>
                  <input onChange={e => setHost(prev => ({...prev, email: e.target.value}))} 
                    className='bg-transparent text-white border border-t-0 border-x-0 border-b-1  text-sm font-race font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
                </div>
                <div className='my-8'>
                  <input onClick={createParticipant}
                    className=' bg-gradient-to-r from-orange-500 to-purple-900 text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72' type="button" value="Submit" />

                </div>


                <a href='/register' className='flex justify-center items-center font-race text-white text-center' sx={{ color: 'white' }} onClick={playSound}>Are You A Guest? Click Here</a>
              </form>
            </div>

          </div>
        </div>
      </div>
    </motion.div>

  )
}
