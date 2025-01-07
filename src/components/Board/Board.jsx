import { useSelector } from 'react-redux';
import './Board.css';

const Board = () => {
  const positionData = useSelector((state) => state.commandData.position);

  return (
    <div className="board">
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 8 }, (_, column) => (
          <div
            key={`${row}-${column}`}
            className={`square 
              ${positionData && positionData?.row === row && positionData?.column === column && positionData?.color === 'WHITE' ? 'pawn-position-white' :
                positionData?.row === row && positionData?.column === column && positionData?.color === 'BLACK' ? 'pawn-position-black' : ''}`}
          >
          </div>
        ))
      )}
    </div>
  );
};

export default Board;