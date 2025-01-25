import React from 'react';
import { IoSearch } from "react-icons/io5";

const Stream = () => {
  return (
    <div className="flex justify-center mt-2">
      <div className="relative w-full max-w-xs">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full text-black px-10 py-2 rounded-2xl border-2 border-pink-500 pr-12" 
        />
       <button> <IoSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
       </button>
      </div>
    </div>
  );
}

export default Stream;
