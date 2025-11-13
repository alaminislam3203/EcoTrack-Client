import React from 'react';
import Error404Image from '../assets/Error-404-Page-Not-Found.png';

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      {/* Responsive container */}
      <div className="w-full max-w-3xl">
        <img
          src={Error404Image}
          alt="Error 404 - Page Not Found"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Message + Button */}
      <div className="text-center mt-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#FF6B6B] mb-2">
          Oops! Page Not Found
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mb-6 px-2">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <a
          href="/"
          className="bg-[#FF6B6B] text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-500 transition-colors duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
