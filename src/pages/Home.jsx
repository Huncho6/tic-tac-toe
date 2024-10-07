import React from 'react';
import { IoPeopleSharp, IoPerson, IoPersonSharp } from "react-icons/io5";

const Home = () => {
  return (
    <div className="h-screen w-screen bg-white dark:bg-black flex flex-col justify-between items-center py-8 relative">
      
      {/* Top Settings Section */}
      <div className="flex justify-between w-full px-6">
        <button className="p-2 bg-black/10 dark:bg-green-800 text-2xl rounded-full text-black dark:text-green-500">
          <IoPerson />
        </button>
      </div>

      /* Game Title and Icon */
      <div className="text-center">
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg mb-4">
          <div className="flex flex-col">
            {/* First Row of X O */}
            <span className="text-6xl mb-6 mt-4 font-extrabold text-black dark:text-green-500">X O</span>
            {/* Second Row of X O */}
            <span className="text-6xl font-extrabold text-black dark:text-green-500 mb-4">X O</span>
          </div>
        </div>
        {/* Game Title */}
        <h1 className="text-4xl text-black dark:text-green-500 font-bold">Tic-Tac-Toe</h1>
      </div>

      
      <div className="space-y-4 w-full max-w-sm px-6">
        <button className="flex items-center justify-center text-xl w-full py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-green-500 rounded-full shadow-md mb-2">
          <IoPersonSharp />
          Play Solo
        </button>
        <button className="flex items-center justify-center text-xl w-full py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-green-500 rounded-full shadow-md mt-2">
          <IoPeopleSharp />
          Play with a Friend
        </button>
      </div>

      {/* About Button */}
      <button className="mb-4 bg-black dark:bg-green-500 text-white dark:text-black py-3 px-10 rounded-full shadow-lg">
        About
      </button>
    </div>
  );
};

export default Home;
