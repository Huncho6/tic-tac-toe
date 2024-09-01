// Square.js
import styled from 'styled-components';

const SquareButton = styled.button`
  background: #ffff;
  height: 22vmin;
  width: 22vmin;
  border: none;
  border-radius: 8px;
  font-size: 12vmin;
  color: purple;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Square = ({ value, onClick }) => {
  return (
    <SquareButton onClick={onClick}>
      {value}
    </SquareButton>
  );
};

export default Square;
