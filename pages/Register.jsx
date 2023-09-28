import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
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
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <motion.div
    initial= {{opacity:0}}
    animate = {{opacity:1}}
    exit={{opacity:0}}
    transition={{duration: 1}}
   >
    <div className='px-10 md:px-20 flex flex-col justify-center items-center bg-gradient-to-r from-[#360023] to-[#0e063a] h-screen w-screen'>
         <div className='text-center text-white text-2xl font-bold uppercase py-2 font-race'>
         <motion.h1
      initial={{y:100}}
      animate={{y:0}}
      transition={{
        duration:"2",
        delay: "0.5"

      }}
      
    >
          Invited Guest Registration
     </motion.h1>
         </div>
          <Box sx={{ width: '100%' }} className="text-white flex flex-col justify-center items-center">
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className='whitespace-nowrap'>
          <Tab sx={{ color: 'white' }} label="Register as Individual"  {...a11yProps(0)} />
          <Tab sx={{ color: 'white' }} label="Register as Church" {...a11yProps(1)} />
      
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <form>
{/* <h2 className='text-white font-medium tracking-[0.9px]'>Register as Individual</h2> */}

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

<a href='/host' className='font-race' sx={{ color: 'white' }}>Are You A Host ?</a>
</form>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <form>
{/* <h2 className='text-white font-medium tracking-[0.9px]'>Register as Church</h2> */}

<div className='my-8'>
<select className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' name="name" id="">
<option value="">Select Church</option>
</select>           
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Phone number' />
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-sm font-race font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Number of participants' />
</div>


<div className='my-8'>
<input className=' bg-gradient-to-r from-purple-800 to-purple-400 text-white rounded-xl py-2 text-sm font-race font-bold outline-none w-72' type="button" value="Submit"  />

</div>

<a href='/host' className='font-race' sx={{ color: 'white' }}>Are You A Host ?</a>

</form>
      </CustomTabPanel>
    
    </Box>
   
    </div>
    </motion.div>
  );
}
