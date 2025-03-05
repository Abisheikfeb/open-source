import React, { useState } from "react";
import { FaListUl } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdArrowBack } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const Home = () => {
  const [nav, setNav] = useState(false);
  const handleNavigation = () => setNav(!nav);

  const buttonClass =
    "w-full  p-24 md:p-20  text-white font-semibold text-center rounded-lg shadow-md transition-colors";

  return (
    <div className="w-90 h-[60px] bg-gray-400/90 mt-1 rounded-3xl border-2 border-red-500 drop-shadow-lg md:rounded-4xl">
      <div className="flex items-center justify-between h-full w-full px-8">
        <div className="flex items-start">
          <button className="text-black">
            <Link to="/" className="flex items-center">
              <MdArrowBack className="text-3xl" />
            </Link>
          </button>
        </div>
        <h1 className="text-pink-800 text-2xl flex items-start font-semibold md:text-4xl">E-SOURCE</h1>
        <ul className="hidden md:flex space-x-10 text-black font-semibold">
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Developers</button>
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Donation</button>
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Contribute Source</button>
          <button className="border-2 rounded-lg p-1 border-purple-800 bg-orange-300">Contact Me</button>
        </ul>
        <div className="hidden md:flex justify-center items-center">
          <button>
            <FaGithub className="text-4xl mt-5 mb-3 text-black" />
          </button>
        </div>
        <div className="md:hidden cursor-pointer" onClick={handleNavigation}>
          {nav ? <IoClose className="text-blue-700 h-5 w-5" /> : <FaListUl className="text-blue-700 h-5 w-5" />}
        </div>
      </div>

      <div className="md:hidden">
        <ul className={!nav ? "hidden" : "w-full bg-white/98 absolute px-2 flex justify-end"}>
          <div className="border-2 border-red-500 bg-slate-400 justify-center p-3 px-5 mt-5 rounded-2xl flex flex-col gap-4 cursor-pointer">
            <button className="border-2 px-3 py-2 rounded-md bg-orange-300 border-indigo-600">Developer</button>
            <button className="border-2 px-3 py-2 rounded-md bg-orange-300 border-indigo-600">Donation</button>
            <button className="border-2 px-3 py-2 rounded-md bg-orange-300 border-indigo-600">Contribute Source</button>
            <button className="border-2 px-3 py-2 rounded-md bg-orange-300 border-indigo-600">Contact</button>

            <div className="flex justify-center items-center">
              <button>
                <FaGithub className="text-4xl mt-5 mb-3 text-black" />
              </button>
            </div>
          </div>
        </ul>
      </div>

      {/* Centered Button Cards */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-10">
        <div className="flex flex-col md:flex-row gap-4 p-6 border md:p-10 rounded-2xl shadow-lg bg-white">
          {/* FREE-BOOK */}
          <Link to="/pdf">
            <button className={`${buttonClass} bg-blue-500 hover:bg-blue-600`}>
              FREE-BOOK
            </button>
          </Link>

          {/* UPLOAD */}
          <Link to="/stream">
            <button className={`${buttonClass} bg-green-500 hover:bg-green-600`}>
              UPLOAD
            </button>
          </Link>

          {/* WikiSearch */}
          <Link to="/WikiSearch">
            <button className={`${buttonClass} bg-purple-500 hover:bg-purple-600`}>
              WikiSearch
            </button>
          </Link>

          <Link to="/chatbot">
            <button className={`${buttonClass} bg-orange-500 hover:bg-purple-600`}>
              AI chat
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;