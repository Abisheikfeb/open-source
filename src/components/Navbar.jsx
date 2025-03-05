import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoEyeOutline } from "react-icons/io5";
import axios from 'axios';
import logo from '../assets/abc-board-learining-svgrepo-com.svg';

const Navbar = () => {
  const [viewCount, setViewCount] = useState(null); // Null for better handling
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/views/1`);
        setViewCount(response.data.views);
      } catch (error) {
        console.error('Error fetching view count:', error);
      }
    };

    fetchViews();
  }, [API_BASE_URL]);

  return (
    <div>
        
    <nav>
      {/* Navbar Header */}
      <div className="border-2 mt-0 bg-violet-500 border-pink-700 p-3 rounded-3xl shadow-md">
        <div className="flex justify-center items-center">
          <img className="h-14" src={logo} alt="Board Learning Logo" />
          <h1 className="text-3xl font-bold text-center text-pink-700 ml-3">
            Board-Learning
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-top min-h-screen p-6">
        <div className="max-w-md text-center mt-5 bg-red-500 p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Explore E-Learning
          </h2>
          <p className="text-gray-600 text-xl">
            Learn from experts anytime, anywhere. <br />
            Enhance your skills with interactive courses. <br />
            Gain certifications to boost your career. <br />
            Start your journey to success today!
          </p>
          <Link to="/home">
            <button className="mt-6 bg-white border-2 border-blue-500 text-blue-500 text-xl font-bold px-8 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition">
              Get Started
            </button>
          </Link>
         


        </div>

        {/* View Counter */}
        <div className=" text-white font-bold">
          <h2 className="text-6xl flex items-start  mt-14 gap-1">
            Views <IoEyeOutline className="text-red-800" size={16} />: {viewCount !== null ? viewCount : "Loading..."}
          </h2>
        </div>
      </div>
      
    </nav>
    
    
    </div>
  );
};

export default Navbar;
