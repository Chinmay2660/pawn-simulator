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
            className={`square 
              ${positionData && positionData?.row === rowIndex && positionData?.column === columnIndex && positionData?.color === 'WHITE' ? 'pawn-position-white' :
                positionData?.row === rowIndex && positionData?.column === columnIndex && positionData?.color === 'BLACK' ? 'pawn-position-black' : ''}`}
          >
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;