import styled from 'styled-components';

const SquareButton = styled.button`
  background: ${({ isDarkMode }) => (isDarkMode ? '#121212' : '#ffff')};  // Dark mode background
  height: 22vmin;
  width: 22vmin;
  border: none;
  border-radius: 8px;
  font-size: 12vmin;
  color: ${({ isDarkMode }) => (isDarkMode ? 'lightgreen' : 'purple')};  // Light green text in dark mode
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Square = ({ value, onClick, isDarkMode }) => {  // Receive isDarkMode as a prop
  return (
    <SquareButton onClick={onClick} isDarkMode={isDarkMode}>
      {value}
    </SquareButton>
  );
};

export default Square;
