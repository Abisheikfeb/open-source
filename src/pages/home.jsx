import React, { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Home = () => {
  const [nav, setNav] = useState(false);
  const handleNavigation = () => setNav(!nav);

  return (
    <div className="w-90 h-[60px] bg-gray-400/90 mt-1 rounded-3xl border-2 border-red-500 drop-shadow-lg md:rounded-4xl">
      <div className="flex items-center justify-between h-full w-full px-8">
      
        <div className=" flex items-start">
          <button className="text-black">
            <Link to="/" className="flex items-center">
              <MdArrowBack className="text-3xl" />
            </Link>
          </button>
        </div>
        <h1 className="text-pink-800 text-2xl flex items-start font-semibold md:text-4xl">E-SOURCE</h1>
        <ul className="hidden md:flex space-x-10   text-black font-semibold">
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Devolopers</button>
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Donation</button>
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Contribute source</button>
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Contact Me</button>
        </ul>
        <div className="hidden md:flex justify-center items-center ">
        <button>
  <FaGithub className="text-4xl mt-5 mb-3 text-black" />
  </button>
</div>
     
        <div className="md:hidden cursor-pointer" onClick={handleNavigation}>
          {nav ? <IoClose className="text-blue-700 h-5 w-5" /> : <FaListUl className="text-blue-700 h-5 w-5" />}
        </div>
      </div>
      <div className='md:hidden'>
        
    <ul className={!nav?"hidden" :'w-full bg-white/98 absolute px-2 flex justify-end'}>
    <div className='border-2 border-red-500 bg-slate-400 justify-center 
    p-3 px-5 mt-5 rounded-2xl  flex flex-col gap-4 cursor-pointer'>
      <button className=' border-2 px-3  py-2 rounded-md border-indigo-600 '>Davoloper</button>
      <button className=' border-2 px-3  py-2 rounded-md border-indigo-600'>Donation</button>
      <button className=' border-2 px-3  py-2 rounded-md border-indigo-600'>Contribute source</button>
      <button className=' border-2 px-3  py-2 rounded-md border-indigo-600'>Contact</button>


      <div className="flex justify-center items-center">
        <button>
  <FaGithub className="text-4xl mt-5 mb-3 text-black" />
  </button>
</div>
      </div>
    </ul>
    
    </div>
    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-16">
  
  <div className="flex flex-col md:flex-row gap-4 p-6 border md:p-20 rounded-2xl shadow-lg bg-white">
    
    <Link to="/pdf">
      <button className="px-7 py-12 md:p-16 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">
        FREE-BOOK
      </button>
    </Link>

    <Link to="/stream" className="flex items-center">
      <button className="px-6 py-12 bg-green-500 md:p-16 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">
        START-LEARN
      </button>
    </Link>
    <Link to="/WikiSearch" className="flex items-center" >
    <button className="px-10 py-12 bg-purple-500 md:p-16 text-white font-semibold rounded-lg shadow-md hover:bg-purple-600">
      WikiSearch
    </button>
    </Link>

  </div>
</div>

    
    </div>
  )

  
}

export default Home