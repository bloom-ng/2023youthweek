<div className='p-8 md:px-20'>
       
<nav className='flex justify-between items-center text-white'>
<div className='font-bold text-xl md:text-2xl'>
  Church 
</div>
  <div className='font-normal md:text-lg space-x-3'>
  <a href="">Login</a>
  <a href="">Register</a>
  </div>
</nav>

<div className="flex flex-col justify-center items-center my-8">
  <img className='object-fit w-96 h-62 md:w-[400px] md:h-[400px] shadow-md shadow-purple-100/30' src={HeroImage} alt="" srcset="" />
  <div className="hidden md:flex md:space-x-10 md:mt-8">

<button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Guest</button>

<button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Host</button>

</div>

</div>


<div className="flex justify-between md:hidden">
<div>
<button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Guest</button>
</div>
<div>
<button className='text-white bg-gradient-to-r from-purple-800 to-purple-400 px-6 py-2 rounded-sm shadow-sm shadow-purple-200/50'>Host</button>
</div>
</div>

</div>