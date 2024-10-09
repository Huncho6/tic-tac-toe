import React, { useEffect, useState, useRef } from "react"; // Importing necessary React hooks
import styled from "styled-components"; // Importing styled-components for styling
import Square from "./Square"; // Importing the Square component
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux

// Styled component for the main wrapper
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#121212" : "#ffff")};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1em;
`;

// Header styled component to display the score
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  max-width: 400px;
  color: ${({ isDarkMode }) => (isDarkMode ? "lightgreen" : "#ffff")};
  font-size: 1.5em;
`;

// Styled component for mode text
const ModeText = styled.div`
  text-align: center;
  margin-top: 1em;
  color: ${({ isDarkMode }) => (isDarkMode ? "lightgreen" : "#000")};
  font-size: 1.2em;
`;

// Styled component for the container holding the squares
const Container = styled.div`
  width: 70vmin;
  height: 70vmin;
  display: flex;
  flex-wrap: wrap;
  gap: 2vmin;
  margin-top: 2em;
`;

// Styled component for the restart button
const RestartButton = styled.button`
  background-color: ${({ isDarkMode }) => (isDarkMode ? "#121212" : "black")};
  color: ${({ isDarkMode }) => (isDarkMode ? "lightgreen" : "white")};
  font-size: 1.3em;
  padding: 1em;
  border-radius: 8px;
  border: none;
  margin: 1.5em 0;
  width: 80%;
`;

// Styled component for the popup
const Popup = styled.div`
  background: ${({ isDarkMode }) =>
    isDarkMode ? "#121212" : "linear-gradient(135deg, #eaeaea, #e45454)"};
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  z-index: 2;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1em;
  font-size: 12vmin;
  top: 0;
  left: 0;

  .new-game {
    font-size: 0.6em;
    padding: 0.5em 1em;
    background-color: ${({ isDarkMode }) => (isDarkMode ? "#121212" : "black")};
    color: ${({ isDarkMode }) => (isDarkMode ? "lightgreen" : "#ffff")};
    border-radius: 0.2em;
    border: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .message {
    color: ${({ isDarkMode }) => (isDarkMode ? "lightgreen" : "#ffffff")};
    text-align: center;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
`;

// Main Board component
const Board = () => {
  const [board, setBoard] = useState(Array(9).fill("")); // State for the board
  const [xTurn, setXTurn] = useState(true); // State to track whose turn it is
  const [winner, setWinner] = useState(null); // State to track the winner
  const [isDraw, setIsDraw] = useState(false); // State to track if the game is a draw
  const [playerScore, setPlayerScore] = useState(0); // State for player's score
  const [botScore, setBotScore] = useState(0); // State for bot's score
  const [difficulty, setDifficulty] = useState("easy"); // State for game difficulty
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Getting dark mode state from Redux
  const popupRef = useRef(null); // Ref for the popup
  const timerRef = useRef(null); // Ref for the timer

  // Winning patterns for the game
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

  // Function to check the winner
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

  // Function to handle click on a square
  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = "X"; // Player's move
    setBoard(newBoard);
    const currentWinner = checkWinner(newBoard);

    if (currentWinner) {
      if (currentWinner === "X") {
        setPlayerScore((prev) => prev + 1);
      } else if (currentWinner === "O") {
        setBotScore((prev) => prev + 1);
      } else {
        setIsDraw(true);
      }
      setWinner(currentWinner);
      return;
    }

    setXTurn(false); // Switch to bot's turn
  };

  // Function for bot's move
  const botMove = (currentBoard) => {
    const emptyIndices = currentBoard
      .map((value, index) => (value === "" ? index : null))
      .filter((index) => index !== null);
    if (emptyIndices.length === 0) return; // No moves left

    let moveIndex;
    if (difficulty === "easy") {
      moveIndex =
        findBlockingMove(currentBoard) ||
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else if (difficulty === "medium") {
      moveIndex =
      findBestMove(currentBoard) ||
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else if (difficulty === "hard") {
      moveIndex = getBestMove(currentBoard);
    }

    const newBoard = [...currentBoard];
    newBoard[moveIndex] = "O"; // Bot's move
    setBoard(newBoard);

    const currentWinner = checkWinner(newBoard);
    if (currentWinner) {
      if (currentWinner === "X") {
        setPlayerScore((prev) => prev + 1);
      } else if (currentWinner === "O") {
        setBotScore((prev) => prev + 1);
      } else if (currentWinner === "draw") {
        setIsDraw(true);
      }
      setWinner(currentWinner);
      return;
    }

    setXTurn(true); // Switch back to player's turn
  };

  // Function to find a blocking move for the bot
  const findBlockingMove = (board) => {
    for (let pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] === "X" && board[b] === "X" && board[c] === "") return c;
      if (board[b] === "X" && board[c] === "X" && board[a] === "") return a;
      if (board[a] === "X" && board[c] === "X" && board[b] === "") return b;
    }
    return null;
  };

 
  // Function to find the best move for the bot in medium difficulty
  const findBestMove = (currentBoard) => {
    // Check if the bot can win
    let move = findBlockingMove(currentBoard, "O");
    if (move !== null) return move;

    // Check if the bot needs to block the player
    move = findBlockingMove(currentBoard, "X");
    if (move !== null) return move;

    // Otherwise, pick a random move
    const emptyIndices = currentBoard
      .map((value, index) => (value === "" ? index : null))
      .filter((index) => index !== null);
    return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  };
  // Function to get the best move for the bot using minimax algorithm
  const getBestMove = (board) => {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O"; // Bot's turn
        let score = minimax(board, 0, false);
        board[i] = ""; // Reset the move
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  // Minimax algorithm to calculate the best move
  const minimax = (board, depth, isMaximizing) => {
    const scores = { X: -1, O: 1, draw: 0 };
    const result = checkWinner(board);

    if (result) return scores[result];

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "O"; // Bot's turn
          let score = minimax(board, depth + 1, false);
          board[i] = ""; // Reset the move
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
          board[i] = "X"; // Player's turn
          let score = minimax(board, depth + 1, true);
          board[i] = ""; // Reset the move
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // useEffect hook to handle bot's move after player's turn
  useEffect(() => {
    if (!xTurn && !winner) {
      const botMoveTimeout = setTimeout(() => {
        botMove(board);
      }, 500); // Simulating delay for bot's move

      return () => clearTimeout(botMoveTimeout);
    }
  }, [xTurn, board, winner]);

  // Function to restart the game
  const restartGame = () => {
    setBoard(Array(9).fill("")); // Reset the board
    setXTurn(true); // Set turn to player
    setWinner(null); // Reset winner
    setIsDraw(false); // Reset draw state
  };

  // Function to start the timer
  const startTimer = () => {
    clearTimeout(timerRef.current); // Clear any existing timer
    timerRef.current = setTimeout(() => {
      // Auto restart if the time is up
      restartGame();
      alert("Time's up! The game has been restarted.");
    }, timeLimit * 1000); // Convert seconds to milliseconds
  };

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <Header isDarkMode={isDarkMode}>
        <div>You: {playerScore}</div>
        <div>Bot: {botScore}</div>
      </Header>

      <ModeText isDarkMode={isDarkMode}>Your Turn</ModeText>

      <div>
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <Container>
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </Container>

      <RestartButton onClick={restartGame}>Reset Game</RestartButton>

      {(winner || isDraw) && (
        <Popup ref={popupRef} isDarkMode={isDarkMode}>
          <p className="message">
            {winner && winner !== "draw"
              ? `${winner} Wins! 🎉`
              : "It's a Draw! 😎"}
          </p>
          <button className="new-game" onClick={restartGame}>
            New Game
          </button>
        </Popup>
      )}
    </Wrapper>
  );
};

export default Board; // Exporting the Board component
