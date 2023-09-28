<div className="bg-gradient-to-r from-[#360023] to-[#0e063a] md:h-screen w-screen md:px-20">
<nav className='p-8 flex justify-between items-center text-white'>
{/* <div className='font-bold text-xl md:text-2xl flex flex-row justify-between'>
<img src={LogoOne} className='w-20 h-20 ' alt="" />
<img src={LogoTwo} className='w-20 h-20' alt="" />
</div> */}
<div className='font-normal md:text-lg space-x-3'>
<Link to="/"> Home</Link>
</div>
</nav>
<div className=' flex-col flex justify-center items-center '>
<div className="flex justify-center text-2xl uppercase py-4 t items-center text-white font-semibold tracking-wide pt-4">
Invited Guest registration
</div>

<div className="grid grid-cols-1 md:grid-cols-2 my-3 md:gap-32">
<div>
<form>
<h2 className='text-white font-medium tracking-[0.9px]'>Register as Individual</h2>

<div className='my-8'>
<input className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' type="name" name="" id="" placeholder='Enter First name' />
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Phone number' />
</div>
<div className='my-8'>
<select className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' name="name" id="">
<option value="">Select Church</option>
</select>           
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
</div>
<div className='my-8'>
<input className=' bg-gradient-to-r from-purple-800 to-purple-400 text-white rounded-sm py-2 text-xl font-bold outline-none w-72' type="button" value="Submit"  />

</div>
</form>
</div>
<div>
<form>
<h2 className='text-white font-medium tracking-[0.9px]'>Register as Church</h2>
<div className='my-8'>
<select className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' name="name" id="">
<option value="">Select Church</option>
</select>           
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Phone number' />
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' type="email" name="" id="" placeholder='Enter Email Address' />
</div>
<div className='my-8'>
<input className='bg-transparent text-white border-b text-xl font-thin outline-none w-72' type="number" name="" id="" placeholder='Enter Number of participants' />
</div>


<div className='my-8'>
<input className=' bg-gradient-to-r from-purple-800 to-purple-400 text-white rounded-sm py-2 text-xl font-bold outline-none w-72' type="button" value="Submit"  />

</div>
</form>
</div>
</div>
</div>
</div>