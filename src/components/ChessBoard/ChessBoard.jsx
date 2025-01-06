import { useSelector } from 'react-redux';
import './ChessBoard.css';

const ChessBoard = () => {
  const positionData = useSelector((state) => state.commandData.position);

  return (
    <div className="board">
      {Array.from({ length: 8 }, (_, rowIndex) =>
        Array.from({ length: 8 }, (_, columnIndex) => (
          <div
            key={`${rowIndex}-${columnIndex}`}
            className={`square`}
          >
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;