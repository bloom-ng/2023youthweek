import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AiTwotoneHome } from 'react-icons/ai'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsPlusCircleFill } from 'react-icons/bs'
import ApiService from '../services/ApiService';
import soundFile from '../assets/sound.mp3';
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

  const createParticipant = async (e) => {
    try {
      e.target.value = "Processing";
      let fData = new FormData()
      fData.append("image", guestImage)
      fData.append("")
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
      className='bg-gradient-to-r from-[#360023] to-[#0e063a]'
    >
      <div className='px-10 md:px-20 flex flex-col justify-center items-center bg-gradient-to-r from-[#360023] to-[#0e063a] w-screen min-h-screen'>
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
                <select onChange={e => setGuest(prev => ({...prev, church_id: e.target.value}))} className='bg-purple-800 text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-72' name="name" id="">
                  <option value="">Select Church</option>
                  {churches.map(church => <option key={church.id} value={church.id}>{church.name}</option>)}
                </select>
                <button type='button' onClick={addChurch}><BsPlusCircleFill className="color-white flex justify-center items-center text-white mr-4" size={30} /></button>

              </div>
              <div className='my-8'>
                <input onChange={e => {setGuestImage(e.target.files[0]); console.log('e.target.files[0] :>> ', e.target.files[0]);}} 
                  className='bg-transparent text-white border justify-center items-center border-t-0 border-x-0 border-b-1 text-sm  font-race font-thin outline-none w-72'
                    accept='image/*'
                   type="file"  />
              </div>
              <div className='my-8'>
                <input onChange={e => setGuest(prev => ({...prev, name: e.target.value}))} 
                  className='bg-transparent text-white border justify-center items-center border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-72' type="text" name="" id="" placeholder='Enter Full name' />
              </div>
              <div className='my-8'>
                <input onChange={e => setGuest(prev => ({...prev, phone: e.target.value}))}
                  className='bg-transparent text-white border-t-0 justify-center items-center border-x-0 border-b-1-1 text-sm font-race font-thin outline-none w-72' type="text" name="" id="" placeholder='Enter Phone number' />
              </div>

              <div className='my-8'>
                <input onChange={e => setGuest(prev => ({...prev, email: e.target.value}))} 
                className='bg-transparent text-white border-t-0 justify-center items-center border-x-0 border-b-1 text-sm font-race font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
              </div>
              <div className='my-8'>
                <input onClick={createParticipant} className=' bg-gradient-to-r from-orange-800 justify-center items-center to-purple-700 drop-shadow-2xl text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72' type="button" value="Submit" />

              </div>

              <a href='/host' className='flex justify-center items-center font-race text-white text-center' sx={{ color: 'white' }} onClick={playSound}>Are You A Host? Click Here.</a>

            </form>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <form onSubmit={createParticipant}> 
              {/* <h2 className='text-white font-medium tracking-[0.9px]'>Register as Church</h2> */}

              <div className='my-8 flex gap-x-4'>
              <select onChange={e => null} className='bg-purple-800 text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-72' name="name" id="">
                  <option value="">Select Church</option>
                  {churches.map(church => <option key={church.id}>{church.name}</option>)}
                </select>
                <button type='button' onClick={addChurch}><BsPlusCircleFill className="color-white flex justify-center items-center text-white mr-4" size={30} /></button>
              </div>
              <div className='my-8'>
                <input className='bg-transparent text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-72' type="text" name="" id="" placeholder='Enter Phone number' />
              </div>
              <div className='my-8'>
                <input className='bg-transparent text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
              </div>
              <div className='my-8'>
                <input className='bg-transparent text-white border-t-0 border-x-0 border-b-1 text-sm font-race font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Number of participants' />
              </div>


              <div className='my-8'>
                <input className=' bg-gradient-to-r from-orange-500 to-purple-900  drop-shadow-2xl text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72' type="button" value="Submit" />

              </div>

              <a href='/host' className='flex justify-center items-center font-race text-white text-center' sx={{ color: 'white' }}>Are You A Host ?</a>

            </form>
          </CustomTabPanel>

        </Box>

      </div>
    </motion.div>
  );
}
