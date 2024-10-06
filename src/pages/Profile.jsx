const Profile = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="p-4 sm:max-w-md md:max-w-lg mx-auto bg-white dark:bg-black text-black dark:text-green-500"> 
        {/* Ensure max width is responsive for tablet and desktop */}

        {/* Welcome section */}
        <div className="flex flex-col items-center text-center mb-6 mt-6 pt-5">
          <h1 className="text-xl font-semibold text-black dark:text-white">Welcome</h1> 
          <h1 className="text-2xl font-bold text-black dark:text-green-500">Username name</h1> {/* Change dynamically */}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 text-center mb-16 sm:grid-cols-3 xs:grid-cols-2 pb-24">
          {/* Ensure grid adjusts for smaller screens */}
          <div className="border-r-2 border-gray-300 dark:border-green-500"> 
            <div className="text-2xl font-bold text-black dark:text-green-500">0</div> 
            <div className="text-black dark:text-white">Wins</div>  
          </div>
          <div className="border-r-2 border-gray-300 dark:border-green-500">
            <div className="text-2xl font-bold text-black dark:text-green-500">0</div>
            <div className="text-black dark:text-white">Loss</div> 
          </div>
          <div>
            <div className="text-2xl font-bold text-black dark:text-green-500">0</div>
            <div className="text-black dark:text-white">Draws</div>
          </div>
        </div>

        {/* Game History */}
        <div className="mb-6 lg:ml-12">
          <h2 className="font-bold text-lg mb-2 text-black dark:text-white">Game History</h2> 
          <button className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center w-full min-h-[100px] sm:w-[300px] lg:w-[400px]"> 
            {/* Added right margin on large screens */}
            <p className="font-semibold">Empty</p>
            <p className="text-sm text-gray-500">Play Some Game</p>
          </button>
        </div>

        {/* Scoreboard */}
        <div className="lg:ml-12">
          <h2 className="font-bold text-lg mb-2 text-black dark:text-white">Scoreboard</h2>
          <button className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center w-full min-h-[100px] sm:w-[300px] lg:w-[400px]">
            <p className="font-semibold">Empty</p>
            <p className="text-sm text-gray-500">Start playing folks</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
