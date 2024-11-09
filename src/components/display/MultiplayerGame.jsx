import React, { useEffect, useState, useRef } from "react";
import Square from "./Square";

const MultiPlayerGame = ({ onGoBack }) => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const popupRef = useRef(null);

  const winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = xTurn ? "X" : "O";
    setBoard(newBoard);
    setXTurn(!xTurn);

    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    for (let pattern of winningPattern) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (board.every((cell) => cell !== "")) {
      setIsDraw(true);
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setXTurn(true);
    setWinner(null);
    setIsDraw(false);
  };

  useEffect(() => {
    if (winner || isDraw) {
      if (popupRef.current) {
        popupRef.current.style.display = "flex";
      }
    } else {
      if (popupRef.current) {
        popupRef.current.style.display = "none";
      }
    }
  }, [winner, isDraw]);

  return (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <div className="w-[70vmin] h-[70vmin] flex flex-wrap gap-[2vmin]">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      <button
        onClick={restartGame}
        className="text-lg mt-6 px-4 py-3 rounded-lg bg-black text-white block mx-auto"
      >
        Restart
      </button>

      {(winner || isDraw) && (
        <div
          ref={popupRef}
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-red-400 z-20 text-6xl gap-4"
        >
          <p className="text-center text-white">
            {winner ? `${winner} Wins! 🎉` : "It's a Draw! 😎"}
          </p>
          <button
            onClick={restartGame}
            className={`px-6 py-2 text-lg font-semibold uppercase tracking-wider rounded ${isDarkMode ? 'bg-gray-900 text-lightgreen' : 'bg-black text-white'}`}
          >
            New Game
          </button>
        </div>
      )}

      <button
        onClick={onGoBack}
        className="mt-4 bg-black dark:bg-green-500 text-white dark:text-black py-2 px-6 rounded-full shadow-lg"
      >
        Go Back
      </button>
    </div>
  );
};

export default MultiPlayerGame;
