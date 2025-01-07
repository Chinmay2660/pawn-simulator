import Board from '../Board/Board';
import './PawnSimulator.css'
import CommandsExecutor from '../CommandsExecutor/CommandsExecutor';
import CommandLogs from '../CommandsLogs/CommandLogs';

const PawnSimulator = () => {
  return (
    <div className='pawnSimulator-container'>
      <Board />
      <div className='controller-container'>
        <CommandsExecutor />
        <CommandLogs />
      </div>
    </div>
  );
};

export default PawnSimulator;