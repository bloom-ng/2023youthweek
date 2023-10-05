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
          <CustomTabPanel value={value} index={0}>
            <form >
              {/* <h2 className='text-white font-medium tracking-[0.9px]'>Register as Individual</h2> */}
              <div className='my-8 flex gap-x-4'>
                <select value={guest.church_id} onChange={e => setGuest(prev => ({...prev, church_id: e.target.value}))} className='bg-purple-800 text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-full' name="name" id="">
                  <option value="">Select Church</option>
                  {churches.map(church => <option key={church.id} value={church.id}>{church.name}</option>)}
                </select>
                <button type='button' onClick={addChurch}><BsPlusCircleFill className="color-white flex justify-center items-center text-white mr-4" size={30} /></button>

              </div>
              <div className='my-8 flex flex-col border-2 justify-center'>
                <label htmlFor="select-img" className='font-race'>Select image <FaRegImage size={30} className='inline'/></label>
                {guestPreview && <img className='w-[100px] h-[100px] justify-center' src={guestPreview} alt="" srcset="" />}
                <input onChange={e => {setGuestImage(e.target.files[0]) ; setGuestPreview(URL.createObjectURL(e.target.files[0]));}} 
                  className='bg-transparent text-white border justify-center hidden items-center border-t-0 border-x-0 border-b-1 text-sm  font-race font-thin outline-none w-full'
                    accept='image/*' id='select-img'
                  
                   type="file"  />
              </div>
              <div className='my-8'>
                <input value={guest.name} onChange={e => setGuest(prev => ({...prev, name: e.target.value}))} 
                  className='bg-transparent text-white border justify-center items-center border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-full' type="text" name="" id="" placeholder='Enter Full name' />
              </div>
              <div className='my-8'>
                <input value={guest.phone} onChange={e => setGuest(prev => ({...prev, phone: e.target.value}))}
                  className='bg-transparent text-white border-t-0 justify-center items-center border-x-0 border-b-1-1 text-sm font-race font-thin outline-none w-full' type="text" name="" id="" placeholder='Enter Phone number' />
              </div>

              <div className='my-8'>
                <input value={guest.email} onChange={e => setGuest(prev => ({...prev, email: e.target.value}))} 
                className='bg-transparent text-white border-t-0 justify-center items-center border-x-0 border-b-1 text-sm font-race font-thin outline-none w-full' type="email" name="" id="" placeholder='Enter Email Address' />
              </div>
              <div className='my-8'>
                <input onClick={createParticipant} className='cursor-pointer bg-gradient-to-r from-orange-800 justify-center items-center to-purple-700 drop-shadow-2xl text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-full' type="button" value="Submit" />

              </div>

              <a href='/host' className='cursor-pointer flex justify-center items-center font-race text-white text-center whitespace-nowrap' sx={{ color: 'white' }} onClick={playSound}>Are You A Host? Click Here.</a>

            </form>
          </CustomTabPanel>
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
