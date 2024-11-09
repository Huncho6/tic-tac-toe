import React, { useState } from "react";
import { IoPeopleSharp, IoPersonSharp } from "react-icons/io5";
import BotGame from "./BotGame";
import MultiPlayerGame from "./MultiPlayerGame";

const Home = () => {
  const [gameMode, setGameMode] = useState(null);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);
  const [difficulty, setDifficulty] = useState("easy");

  const handlePlaySolo = () => {
    setGameMode("bot");
    setShowDifficultyModal(true); // Show difficulty modal for solo play
  };

  const handlePlayWithFriend = () => {
    setGameMode("multiplayer");
    setShowTimerModal(true); // Show timer modal for multiplayer play
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time * 60); // Convert minutes to seconds
    setShowTimerModal(false); // Close timer modal
  };

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setShowDifficultyModal(false); // Close difficulty modal
    setShowTimerModal(true); // Show timer modal after difficulty is selected
  };

  const handleGoBack = () => {
    if (gameMode === "bot") {
      setShowDifficultyModal(true); // Show difficulty modal again for solo mode
    }
    setGameMode(null); // Reset game mode
    setSelectedTime(null); // Reset selected time
    setDifficulty("easy"); // Reset difficulty
  };

  return (
    <div className="h-screen w-screen bg-white dark:bg-black flex flex-col justify-between items-center py-8 relative">
      {gameMode === null ? (
        <>
          {/* Home Screen Content */}
          <div className="text-center">
            <h1 className="text-4xl text-black dark:text-green-500 font-bold">
              Tic-Tac-Toe
            </h1>
          </div>
          <div className="text-center">
            <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg mb-4">
              <div className="flex flex-col">
                <span className="text-6xl mb-6 mt-4 font-extrabold text-black dark:text-green-500">
                  X O
                </span>
                <span className="text-6xl font-extrabold text-black dark:text-green-500 mb-4">
                  X O
                </span>
              </div>
            </div>
            <h1 className="text-4xl text-black dark:text-green-500 font-bold">
              Tic-Tac-Toe
            </h1>
          </div>
          <div className="space-y-4 w-full max-w-sm px-6">
            <button
              onClick={handlePlaySolo}
              className="flex items-center justify-center text-xl w-full py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-green-500 rounded-full shadow-md mb-2"
            >
              <IoPersonSharp />
              Play Solo
            </button>
            <button
              onClick={handlePlayWithFriend}
              className="flex items-center justify-center text-xl w-full py-4 bg-white dark:bg-gray-900 text-gray-800 dark:text-green-500 rounded-full shadow-md mt-2"
            >
              <IoPeopleSharp />
              Play with a Friend
            </button>
          </div>
        </>
      ) : showDifficultyModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-center mb-4">
              Select Difficulty Level
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  onClick={() => handleDifficultySelect(level)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-green-500 py-2 rounded-lg font-semibold"
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : showTimerModal ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-center mb-4">
              Select Game Duration
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[0.5, 1, 2, 5].map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-green-500 py-2 rounded-lg font-semibold"
                >
                  {time === 0.5
                    ? "30 Seconds"
                    : `${time} Minute${time > 1 ? "s" : ""}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {gameMode === "bot" ? (
            <BotGame
              onGoBack={handleGoBack}
              selectedTime={selectedTime}
              difficulty={difficulty}
              setShowDifficultyModal={setShowDifficultyModal}
            />
          ) : (
            <MultiPlayerGame
              onGoBack={handleGoBack}
              selectedTime={selectedTime}
              setShowTimerModal={setShowTimerModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
