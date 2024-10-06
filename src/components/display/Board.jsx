import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import Square from './Square';


const Wrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const Container = styled.div`
  width: 70vmin;
  height: 70vmin;
  display: flex;
  flex-wrap: wrap;
  gap: 2vmin;
`;

const RestartButton = styled.button`
  font-size: 1.3em;
  margin-top: 1.5em;
  padding: 1em;
  border-radius: 8px;
  background-color: black;
  color: white;
  border: none;
  position: relative;
  margin: 1.5em auto 0 auto;
  display: block;
`;

const Popup = styled.div`
  background: linear-gradient(135deg, #eaeaea, #e45454);
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
    background-color: black;
    color: #ffff;
    border-radius: 0.2em;
    border: none;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .message {
    color: #ffffff;
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
      // Set the popup to be visible and take up the whole screen
      if (popupRef.current) {
        popupRef.current.style.display = 'flex';
      }
    } else {
      // Hide the popup
      if (popupRef.current) {
        popupRef.current.style.display = 'none';
      }
    }
  }, [winner, isDraw]);

  return (
    <Wrapper>
      <Container>
        {board.map((value, index) => (
           <Square
           key={index}
           value={value}
           onClick={() => handleClick(index)}
         />
        ))}
      </Container>
      <RestartButton onClick={restartGame}>Restart</RestartButton>
      {(winner || isDraw) && (
        <Popup ref={popupRef}>
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