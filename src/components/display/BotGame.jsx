import React, { useEffect, useState } from "react";
import Square from "./Square";
import { useSelector } from "react-redux";

const BotGame = ({ onGoBack, selectedTime, difficulty, setDifficulty }) => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false); // New state to track game start
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [showFinalPopup, setShowFinalPopup] = useState(false);
  const [consecutivePlayerWins, setConsecutivePlayerWins] = useState(0);
  const [showDifficultyPopup, setShowDifficultyPopup] = useState(false); // New state

  // Inside BotGame component
  useEffect(() => {
    if (gameStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowFinalPopup(true); // Show popup when time runs out
            return selectedTime;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, selectedTime, timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[a] === currentBoard[c]
      ) {
        return currentBoard[a];
      }
    }
    if (currentBoard.every((cell) => cell !== "")) {
      return "draw";
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] !== "" || winner || isDraw || !gameStarted) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    const currentWinner = checkWinner(newBoard);

    if (currentWinner === "X") {
      setPlayerScore((prev) => prev + 1); // Increment player score
      setWinner("X");
    } else if (currentWinner === "draw") {
      setIsDraw(true);
      setWinner("draw");
    } else {
      setXTurn(false); // Switch to bot's turn if no winner yet
    }

    updateDifficultyBasedOnWins(currentWinner); // Check and update difficulty after every move
  };

  const botMove = (currentBoard) => {
    if (winner || isDraw) return;

    const emptyIndices = currentBoard
      .map((value, index) => (value === "" ? index : null))
      .filter((index) => index !== null);
    if (emptyIndices.length === 0) return; // No moves left

    let moveIndex;
    if (difficulty === "easy") {
      moveIndex =
        findWinningOrBlockingMove(currentBoard, "O") || // Bot tries to win
        findWinningOrBlockingMove(currentBoard, "X") || // Bot blocks user
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else if (difficulty === "medium") {
      moveIndex = findBestMoveWithWeighting(currentBoard);
    } else if (difficulty === "hard") {
      moveIndex = getBestMoveWithAlphaBetaPruning(currentBoard);
    }

    const newBoard = [...currentBoard];
    newBoard[moveIndex] = "O"; // Bot's move
    setBoard(newBoard);

    const currentWinner = checkWinner(newBoard);
    if (currentWinner === "O") {
      setBotScore((prev) => prev + 1);
      setWinner("O");
      setConsecutivePlayerWins(0); // Reset on bot win
    } else if (currentWinner === "draw") {
      setIsDraw(true);
      setWinner("draw");
      setConsecutivePlayerWins(0);
    } else {
      setXTurn(true); // Switch back to player's turn
    }

    updateDifficultyBasedOnWins(currentWinner); // Check and update difficulty after each bot move
  };

  const updateDifficultyBasedOnWins = (currentWinner) => {
    if (currentWinner === "X") {
      setConsecutivePlayerWins((prev) => prev + 1);
      if (consecutivePlayerWins + 1 >= 3) {
        setDifficulty((prevDifficulty) => {
          const newDifficulty =
            prevDifficulty === "easy"
              ? "medium"
              : prevDifficulty === "medium"
              ? "hard"
              : "hard";
          setShowDifficultyPopup(true); // Show popup on difficulty change
          setTimeout(() => setShowDifficultyPopup(false), 2000); // Hide popup after 2 seconds
          return newDifficulty;
        });
      }
    } else {
      setConsecutivePlayerWins(0); // Reset when bot wins
    }
  };
  // Function to find winning or blocking moves
  const findWinningOrBlockingMove = (board, player) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === player && board[b] === player && board[c] === "")
        return c;
      if (board[a] === player && board[c] === player && board[b] === "")
        return b;
      if (board[b] === player && board[c] === player && board[a] === "")
        return a;
    }
    return null;
  };

  // Function to find the best move for medium difficulty with weighting
  const findBestMoveWithWeighting = (board) => {
    const center = 4;
    const corners = [0, 2, 6, 8];

    let move =
      findWinningOrBlockingMove(board, "O") ||
      findWinningOrBlockingMove(board, "X");
    if (move !== null) return move;

    // Prefer the center if available
    if (board[center] === "") return center;

    // Then, prefer any corner
    const emptyCorners = corners.filter((i) => board[i] === "");
    if (emptyCorners.length > 0)
      return emptyCorners[Math.floor(Math.random() * emptyCorners.length)];

    // If center and corners are taken, pick any empty spot
    const emptyIndices = board
      .map((value, index) => (value === "" ? index : null))
      .filter((index) => index !== null);
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };

  // Function to get the best move for hard mode using minimax with alpha-beta pruning
  const getBestMoveWithAlphaBetaPruning = (board) => {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        let score = minimax(board, 0, -Infinity, Infinity, false);
        board[i] = "";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  // Minimax with alpha-beta pruning
  const minimax = (board, depth, alpha, beta, isMaximizing) => {
    const scores = { X: -1, O: 1, draw: 0 };
    const result = checkWinner(board);

    if (result) return scores[result];

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O";
          let score = minimax(board, depth + 1, alpha, beta, false);
          board[i] = "";
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, score);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X";
          let score = minimax(board, depth + 1, alpha, beta, true);
          board[i] = "";
          bestScore = Math.min(score, bestScore);
          beta = Math.min(beta, score);
          if (beta <= alpha) break; // Alpha-beta pruning
        }
      }
      return bestScore;
    }
  };

  useEffect(() => {
    if (!xTurn && !winner && gameStarted) {
      const botMoveTimeout = setTimeout(() => {
        botMove(board);
      }, 500);
      return () => clearTimeout(botMoveTimeout);
    }
  }, [xTurn, board, winner, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(selectedTime); // Initialize the timer
  };
  // Function to start the game

  useEffect(() => {
    startGame();
  }, []);

  const restartGame = () => {
    setWinner(null); // Clear winner
    setIsDraw(false); // Clear draw state
    setBoard(Array(9).fill("")); // Reset the board
    setXTurn(true); // Reset turn
    // Do not reset playerScore and botScore if you want cumulative scores
    // setPlayerScore(0);
    // setBotScore(0);
    setGameStarted(true); // Keep game started flag true to continue the session
  };

  const cumulativeWinner =
    playerScore > botScore ? "Player" : playerScore < botScore ? "Bot" : "Draw";

  return (
    <div
      className={`relative w-screen h-screen flex flex-col items-center pt-4 ${
        isDarkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div>You: {playerScore}</div>
      <div>Bot: {botScore}</div>
      {gameStarted && (
        <>
          <div className="text-2xl mb-2">{`Time Left: ${formatTime(
            timeLeft
          )}`}</div>
          <div
            className="flex justify-between items-center w-11/12 max-w-xs text-xl mb-4"
            style={{ color: isDarkMode ? "lightgreen" : "#ffffff" }}
          >
            <div>You: {playerScore}</div>
            <div>Bot: {botScore}</div>
          </div>
          <div className="w-[70vmin] h-[70vmin] flex flex-wrap gap-[2vmin] mt-6">
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
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
                isDarkMode
                  ? "bg-gray-900"
                  : "bg-gradient-to-r from-gray-200 to-red-400"
              }`}
              style={{ zIndex: 2 }}
            >
              <p
                className="text-center text-6xl"
                style={{ color: isDarkMode ? "lightgreen" : "#ffffff" }}
              >
                {winner && winner !== "draw"
                  ? `${winner} Wins! 🎉`
                  : "It's a Draw! 😎"}
              </p>
              <button
                onClick={restartGame}
                className="px-6 py-2 text-2xl text-white bg-black rounded-lg"
              >
                Restart Game
              </button>
              <button
                onClick={onGoBack}
                className="text-lg px-4 py-2 text-white bg-black rounded-lg mt-6"
              >
                Back
              </button>
            </div>
          )}
          {showDifficultyPopup && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
              } opacity-90`}
              style={{ zIndex: 3 }}
            >
              <p
                className="text-center text-4xl"
                style={{ color: isDarkMode ? "lightgreen" : "#333" }}
              >
                Difficulty Level Increased!
              </p>
            </div>
          )}

          {showFinalPopup && (
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 ${
                isDarkMode
                  ? "bg-gray-900"
                  : "bg-gradient-to-r from-gray-200 to-red-400"
              }`}
              style={{ zIndex: 2 }}
            >
              <p
                className="text-center text-4xl"
                style={{ color: isDarkMode ? "lightgreen" : "#ffffff" }}
              >
                {cumulativeWinner === "Draw"
                  ? "It's a Draw! 😎"
                  : `${cumulativeWinner} is the Game Winner! 🎉`}
              </p>
              <button
                onClick={onGoBack}
                className="text-lg px-4 py-2 text-white bg-black rounded-lg mt-6"
              >
                New Game
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BotGame;
