import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import Square from './Square';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#121212' : '#ffff')};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1em;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  max-width: 400px;
  color: ${({ isDarkMode }) => (isDarkMode ? 'lightgreen' : '#ffff')};
  font-size: 1.5em;
`;

const ModeText = styled.div`
  text-align: center;
  margin-top: 1em;
  color: ${({ isDarkMode }) => (isDarkMode ? 'lightgreen' : '#000')};
  font-size: 1.2em;
`;

const Container = styled.div`
  width: 70vmin;
  height: 70vmin;
  display: flex;
  flex-wrap: wrap;
  gap: 2vmin;
  margin-top: 2em;
`;

const RestartButton = styled.button`
  background-color: ${({ isDarkMode }) => (isDarkMode ? '#121212' : 'black')};  
  color: ${({ isDarkMode }) => (isDarkMode ? 'lightgreen' : 'white')};  
  font-size: 1.3em;
  padding: 1em;
  border-radius: 8px;
  border: none;
  margin: 1.5em 0;
  width: 80%;
`;

const Popup = styled.div`
  background: ${({ isDarkMode }) => (isDarkMode ? '#121212' : 'linear-gradient(135deg, #eaeaea, #e45454)')};
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
    background-color: ${({ isDarkMode }) => (isDarkMode ? '#121212' : 'black')};
    color: ${({ isDarkMode }) => (isDarkMode ? 'lightgreen' : '#ffff')};
    border-radius: 0.2em;
    border: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .message {
    color: ${({ isDarkMode }) => (isDarkMode ? 'lightgreen' : '#ffffff')};
    text-align: center;
    font-size: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
  }
`;

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
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
        if (board[a] === 'X') {
          setPlayerScore(prev => prev + 1);
        } else {
          setBotScore(prev => prev + 1);
        }
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
        popupRef.current.style.display = 'flex';
      }
    } else {
      if (popupRef.current) {
        popupRef.current.style.display = 'none';
      }
    }
  }, [winner, isDraw]);

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <Header isDarkMode={isDarkMode}>
        <div>You: {playerScore}</div>
        <div>Bot: {botScore}</div>
      </Header>

      <ModeText isDarkMode={isDarkMode}>Your Turn</ModeText>

      <Container>
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isDarkMode={isDarkMode}
          />
        ))}
      </Container>

      <RestartButton onClick={restartGame} isDarkMode={isDarkMode}>
        Reset Game
      </RestartButton>

      {(winner || isDraw) && (
        <Popup ref={popupRef} isDarkMode={isDarkMode}>
          <p className="message">
            {winner ? `${winner} Wins! 🎉` : "It's a Draw! 😎"}
          </p>
          <button className="new-game" onClick={restartGame}>
            New Game
          </button>
        </Popup>
      )}
    </Wrapper>
  );
};

export default Board;
