import { useSelector } from 'react-redux';
import './Board.css';

const Board = () => {
  const position = useSelector((state) => state.commandData.position);

  return (
    <div className="board">
      {Array.from({ length: 8 }, (_, row) =>  //for rows
        Array.from({ length: 8 }, (_, column) => (  //for columns
          <div
            key={`${row}-${column}`}  // 0-0
            className={`square 
              ${position && position?.row === row && position?.column === column && position?.color === 'WHITE' ? 'pawn-position-white' :
                position?.row === row && position?.column === column && position?.color === 'BLACK' ? 'pawn-position-black' : ''}`}
          >
          </div>
        ))
      )}
    </div>
  );
};

export default Board;