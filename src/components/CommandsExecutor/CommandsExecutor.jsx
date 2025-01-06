import { useState } from "react";
import './CommandsExecutor.css';
import { useDispatch, useSelector } from "react-redux";
import { setCommandList, resetCommandList, setPosition } from "../../redux/Reducers/commandSlice";

const CommandsExecutor = () => {
    const dispatch = useDispatch()
    const positionData = useSelector((state) => state.commandData.position)
    const [isTwoSteps, setTwoSteps] = useState(false)
    const [place, setPlace] = useState({
        row: null,
        column: null,
        direction: 'SOUTH',
        color: 'WHITE'
    })
    const [isPlaced, setIsPlaced] = useState(true)

    const handlePawnPlacement = (row, column, direction, color) => {
        if (row >= 0 && row < 8 && column >= 0 && column < 8) {
            dispatch(setPosition({ row, column, direction, color }))
            setIsPlaced(true);
        }
    }

    const handleReport = () => {
        if (!isPlaced) {
            alert('Please place PAWN First!')
            return;
        }
        dispatch(setCommandList(`Output: ${positionData.row},${positionData.column},${positionData.direction},${positionData.color}`))
    }

    const handleMovePawn = (forwardSteps) => {

        if (!isPlaced) {
            alert('Please place PAWN First!')
            return;
        }
        if (forwardSteps === 2) {
            if (isTwoSteps) {
                alert('Invalid Command!');
                return;
            }
            setTwoSteps(true);
        }
        dispatch(setCommandList(`MOVE ${forwardSteps}`))

        let newRow = positionData?.row;
        let newColumn = positionData?.column;

        switch (positionData?.direction) {
            case 'NORTH':
                newColumn += forwardSteps;
                break;
            case 'EAST':
                newRow += forwardSteps;
                break;
            case 'SOUTH':
                newColumn -= forwardSteps;
                break;
            case 'WEST':
                newRow -= forwardSteps;
                break;
            default:
                return;
        }
       
        if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) {
            dispatch(setPosition({ ...positionData, row: newRow, column: newColumn }))
        }
    }

    const handleMoveLeftRightPawn = () => {
        if (!isPlaced) {
            alert('Please place PAWN First!')
            return;
        }
    }

    const handleCommand = (command) => {
        const originalCommand = command;
        const [commandType, commandValue] = command.split(' ');
        switch (commandType) {
            case 'PLACE':
                const [row, column, direction, color] = commandValue.split(',');
                handlePawnPlacement(parseInt(row), parseInt(column), direction, color)
                dispatch(setCommandList(originalCommand))
                break;
            case 'MOVE':
                handleMovePawn(parseInt(commandValue))
                break;
            case 'LEFT':
                handleMoveLeftRightPawn('LEFT')
                dispatch(setCommandList(originalCommand))
                break;
            case 'RIGHT':
                handleMoveLeftRightPawn('RIGHT')
                dispatch(setCommandList(originalCommand))
                break;
            case 'REPORT':
                handleReport()
                break;
            default:
                alert('Invalid command');
        }
    }

    const handlePlacement = (e) => {
        e.preventDefault()
        if (place?.row.trim() && place?.column.trim()) {
            handleCommand(`PLACE ${place?.row},${place?.column},${place?.direction},${place?.color}`);
            setPlace((prevPlace) => ({
                ...prevPlace,
                row: '',
                column: '',
                direction: 'SOUTH',
                color: 'WHITE'
            }));
        }
    };

    const handleReset = () => {
        dispatch(resetCommandList())
        setIsPlaced(false)
        setPlace({
            row: '',
            column: '',
            direction: 'SOUTH',
            color: 'WHITE'
        });
        dispatch(setPosition({
            row: null,
            column: null,
            direction: null,
            color: null
        }))
        setTwoSteps(false)
    }

    return (
        <div className="controls">
            <form onSubmit={handlePlacement} className="place-controls">
                <input
                    type="number"
                    placeholder="Row"
                    value={place?.row}
                    onChange={(e) => {
                        if (e.target.value < 0 || e.target.value > 7) return;
                        setPlace((prevPlace) => ({
                            ...prevPlace,
                            row: e.target.value
                        }))
                    }}
                />
                <input
                    type="number"
                    placeholder="Column"
                    value={place?.column}
                    onChange={(e) => {
                        if (e.target.value < 0 || e.target.value > 7) return;
                        setPlace((prevPlace) => ({
                            ...prevPlace,
                            column: e.target.value
                        }))
                    }}
                />
                <select
                    value={place?.direction}
                    onChange={(e) => setPlace((prevPlace) => ({
                        ...prevPlace,
                        direction: e.target.value
                    }))}
                >
                    <option value="NORTH">North</option>
                    <option value="SOUTH">South</option>
                    <option value="EAST">East</option>
                    <option value="WEST">West</option>
                </select>
                <select
                    value={place?.color}
                    onChange={(e) => setPlace((prevPlace) => ({
                        ...prevPlace,
                        color: e.target.value
                    }))}
                >
                    <option value="WHITE">White</option>
                    <option value="BLACK">Black</option>
                </select>
                <button type="submit" className="btn">Place</button>
            </form>

            <div className="forward-controls">
                <text>Move: </text>
                <button className="btn" onClick={() => handleCommand('MOVE 1')}>1 Place</button>
                <button className="btn" onClick={() => handleCommand('MOVE 2')}>2 Places</button>
            </div>

            <div className="right-left-controls">
                <text>Direction: </text>
                <button className="btn" onClick={() => handleCommand('LEFT')}>Left</button>
                <button className="btn" onClick={() => handleCommand('RIGHT')}>Right</button>
            </div>

            <div className='final-btns'>
                <button className='btn report-btn' onClick={() => handleCommand('REPORT')}>Report</button>
                <button className='btn reset-btn' onClick={handleReset}>Reset</button>
            </div>
        </div>
    );
};

export default CommandsExecutor;
