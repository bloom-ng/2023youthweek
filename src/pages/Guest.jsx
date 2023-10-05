/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AiOutlineDownload, AiTwotoneHome, AiOutlineClose} from 'react-icons/ai'
import {FaRegImage} from 'react-icons/fa'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsPlusCircleFill } from 'react-icons/bs'
import ApiService from '../services/ApiService';
import soundFile from '../assets/sound.mp3';
import Swal from 'sweetalert2';
import User from './user';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;


  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    className: "font-race text-sm"
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [churches, setChurches] = React.useState([])
  const [newChurch, setNewChurch] = React.useState({name: ""})
  const [guestImage, setGuestImage] = React.useState(null)
  const [guestPreview, setGuestPreview] = React.useState('')
  const [modalOpen, setModalOpen] = React.useState(false);
  const [guest, setGuest] = React.useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    type: 1,
    church_id: 0,
  })
  const [guests, setGuests] = React.useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    participants: 1,
    type: 1,
    church_id: 0,
  })

  const playSound = () => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchChurches = async () => {
    try {
      let res = await ApiService.ChurchList();
        setChurches(res);
    } catch (error) {
      throw new Error(error)
    }
  }
  const closeModal = () => {
    // Close the modal
    setModalOpen(false);
  
    // Clear the form fields
    setGuest({
      name: "",
      email: "",
      phone: "",
      gender: "male",
      type: 1,
      church_id: 0,
    });
    setGuestImage(null);
  };
  

  const createParticipant = async (e) => {
    try {
      e.target.value = "Processing";
      const fData = new FormData();
      fData.append("image", guestImage);
      for (const key in guest) {
        fData.append(key, guest[key]);
      }
      console.log(guestImage)
      setModalOpen(true);
      // const response = await ApiService.ParticipantCreate(fData);
      // if(response.status){setModalOpen(true);}
    } catch (error) {
      e.target.value = "Submit";
      throw new Error(error);
    }
    e.target.value = "Submit";
  }
  

  const createChurchParticipants = async (e) => {
    try {
      e.target.value = "Processing";
      await ApiService.ParticipantCreate(guest)
      setGuest({name: "", email: "", phone: "", gender: "male", type: 1, church_id: 0})
      alert("Created")
      window.location.reload();
    } catch (error) {
      e.target.value = "Submit";
      throw new Error(error)
    }
    e.target.value = "Submit";
  }

  const addChurch = async () => {
    let name = prompt();
    if (name.length < 1) return;
    try {
      let res = ApiService.ChurchCreate({name})
      await fetchChurches()
      
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(()=> {
     (
        async ( ) => {
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
      className='bg-gradient-to-r from-[#360023] to-[#0e063a] overflow-x-hidden'
    >
      <div className='px-2 md:px-20 flex flex-col justify-center items-center bg-gradient-to-r from-[#360023] to-[#0e063a] w-full min-h-screen '>
        <div className='text-center text-white text-2xl font-bold uppercase py-2 font-race'>
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{
              duration: "2",
              delay: "0.5"

            }}

          >
            <Link to="/">
              <AiTwotoneHome size={30} className='inline mr-2' /></Link>
            Invited Guest Registration
          </motion.h1>
        </div>
        <Box sx={{ width: '100%' }} className="text-white flex flex-col justify-center items-center">
          <Box>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='whitespace-nowrap'>
              <Tab sx={{ color: 'white' }} label=" "  {...a11yProps(0)} />
              {/* <Tab sx={{ color: 'white' }} label=" Church" {...a11yProps(1)} /> */}

            </Tabs>
          </Box>
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
          <CustomTabPanel value={value} index={1}>
            <form onSubmit={createParticipant}> 
              {/* <h2 className='text-white font-medium tracking-[0.9px]'>Register as Church</h2> */}

              <div className='my-8 flex gap-x-4'>
              <select onChange={e => null} className='bg-purple-800 text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-full' name="name" id="">
                  <option value="">Select Church</option>
                  {churches.map(church => <option key={church.id}>{church.name}</option>)}
                </select>
                <button type='button' onClick={addChurch}><BsPlusCircleFill className="color-white flex justify-center items-center text-white mr-4" size={30} /></button>
              </div>
              <div className='my-8'>
                <input className='bg-transparent text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-full' type="text" name="" id="" placeholder='Enter Phone number' />
              </div>
              <div className='my-8'>
                <input className='bg-transparent text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-full' type="email" name="" id="" placeholder='Enter Email Address' />
              </div>
              <div className='my-8'>
                <input className='bg-transparent text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-full' type="number" name="" id="" placeholder='Enter Number of participants' />
              </div>


              <div className='my-8'>
                <input className=' bg-gradient-to-r from-orange-500 to-purple-900  drop-shadow-2xl text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-full' type="button" value="Submit" />

              </div>

              <a href='/host' className='cursor-pointer flex justify-center items-center font-race text-white text-center' sx={{ color: 'white' }}>Are You A Host ?</a>

            </form>
          </CustomTabPanel>

        </Box>

      </div>
      {modalOpen && (
      <div className="bg-gray-800 bg-opacity-50 flex items-center justify-center fixed top-0 left-0 w-screen h-screen">
        {/* Modal content */}
        <div className="flex justify-between items-center ">
        <button className='hidden md:flex'><AiOutlineDownload size={30} className='text-white relative right-28 -top-[22px] '/></button>
     
        </div>
        <div className="modal-content bg-transparent p-2 ">
          {/* Add your modal content here */}

          <User image={URL.createObjectURL(guestImage)} name={guest.name}/>
          {/* <img src={} alt="user-image" className='rounded-full h-[90px] w-[90px]' />
        
          <h1>{}</h1>
          <p>I will be attending</p>
          <button className='border rounded-md p-4' onClick={() => {
            closeModal();
          }}>
            Done
          </button> */}
        </div>
        <button className='hidden md:flex'  closeModal={closeModal}><AiOutlineClose size={30} className='text-white relative left-28 -top-[22px]'/> </button>
     
      </div>
    )}
    </motion.div>
  );
}
