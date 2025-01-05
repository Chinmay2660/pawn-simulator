import './ChessBoard.css';

const ChessBoard = ({ pawnPosition, boardSize }) => {
  return (
    <div className="board">
      {Array.from({ length: boardSize }, (_, rowIndex) =>
        Array.from({ length: boardSize }, (_, columnIndex) => (
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