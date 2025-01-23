import React from 'react';
import logo from '../assets/abc-board-learining-svgrepo-com.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isVisible, setIsVisible] = React.useState(true);
  const handleGetStartedClick = () => {
    setIsVisible(false); 
  };

  return (
    <nav>
      <div className="border-2 mt-0 bg-violet-500 border-pink-700 p-3 rounded-3xl shadow-md">
        <div className="flex justify-center items-center">
          <img className="h-14" src={logo} alt="Board Learning Logo" />
          <h1 className="text-3xl font-bold text-center text-pink-700 ml-3">
            Board-Learning
          </h1>
        </div>
      </div>
      {isVisible && (
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
            <Link to="/">
              <button
                onClick={handleGetStartedClick}
                className="mt-6 bg-white border-2 border-blue-500 text-blue-500 text-xl font-bold px-8 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition"
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


