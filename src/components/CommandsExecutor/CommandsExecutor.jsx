import { useState } from "react";
import './CommandsExecutor.css';
import { useDispatch, useSelector } from "react-redux";
import { setCommandList, resetCommandList, setPosition } from "../../redux/Reducers/commandSlice";

const CommandsExecutor = () => {
    const dispatch = useDispatch()
    const position = useSelector((state) => state.commandData.position)
    const [stepsMoved, setStepsMoved] = useState(false)
    const [place, setPlace] = useState({
        row: null,
        column: null,
        direction: 'SOUTH',
        color: 'WHITE'
    })
    const [isPlaced, setIsPlaced] = useState(true)

    const handlePawnPlacement = (row, column, direction, color) => {
        if (row >= 0 && row < 8 && column >= 0 && column < 8) { // validation to avoid PAWN to fall of the board
            dispatch(setPosition({ row, column, direction, color }))
            dispatch(setCommandList(`PLACE ${row}, ${column}, ${direction}, ${color}`))
            setIsPlaced(true);
        }
    }

    const handleReport = () => {
        if (!isPlaced) {
            alert('Please place Pawn First!')
            return;
        }
        dispatch(setCommandList(`Output: ${position?.row}, ${position?.column}, ${position?.direction}, ${position?.color}`))
    }

    const handleMovePawn = (forwardSteps) => {
        if (!isPlaced) {
            alert('Please place Pawn First!')
            return;
        }
        if (forwardSteps === 2) {
            if (stepsMoved) { // if any command 1 or 2 places is already moved then throw error
                alert('Invalid Command!');
                return;
            }
            setStepsMoved(true); //set 2 as already moved
        } else if (forwardSteps === 1) {
            setStepsMoved(true); //set 1 as already moved
        }

        let newRow = position?.row;
        let newColumn = position?.column;

        switch (position?.direction) {
            case 'NORTH':
                newRow -= forwardSteps; // for north shift rows from (1,1) -> (0,1)
                break;
            case 'EAST':
                newColumn += forwardSteps; // for north shift rows from (0,0) -> (0,1)
                break;
            case 'SOUTH':
                newRow += forwardSteps; // for south shift rows from (0,1) -> (1,1)
                break;
            case 'WEST':
                newColumn -= forwardSteps; // for west shift rows from (0,1) -> (0,0)
                break;
            default:
                return;
        }
       
        if (newRow >= 0 && newRow < 8 && newColumn >= 0 && newColumn < 8) { // validation to avoid PAWN to fall of the board
            dispatch(setPosition({ ...position, row: newRow, column: newColumn }))
            dispatch(setCommandList(`MOVE ${forwardSteps}`));
        }
    }

    const handleMoveLeftRightPawn = (direction) => {
        if (!isPlaced) {
            alert('Please place Pawn First!')
            return;
        }
        const facing = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
        let currentIndex = facing.indexOf(position?.direction);
        if(position?.direction === 'EAST' || position?.direction === 'SOUTH') {
            currentIndex = direction === 'LEFT' ? currentIndex - 1 : currentIndex + 1; // east and south both have elements on left and right in facing array
        } else if (position?.direction === 'WEST') {
            currentIndex = direction === 'LEFT' ? currentIndex - 1 : 0; // west only have elements on left and right it doesnt have. As the facing array ends, by default first elemnent will be in right of west
        } else if (position?.direction === 'NORTH') {
            currentIndex = direction === 'LEFT' ? facing?.length - 1 : currentIndex + 1; // north only have elements on right and left it doesnt have. As the facing array starts to right, by default last elemnent will be in left of north
        }

        dispatch(setPosition({ ...position, direction: facing[currentIndex] }));
        dispatch(setCommandList(direction));
    }

    const handleCommand = (command) => {
        const [commandType, commandValue] = command.split(' ');
        switch (commandType) {
            case 'PLACE':
                const [row, column, direction, color] = commandValue.split(',');
                handlePawnPlacement(parseInt(row), parseInt(column), direction, color)
                break;
            case 'MOVE':
                handleMovePawn(parseInt(commandValue)) // commandValue = 1 or 2
                break;
            case 'LEFT':
                handleMoveLeftRightPawn(commandType)
                break;
            case 'RIGHT':
                handleMoveLeftRightPawn(commandType)
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
        setStepsMoved(false)
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
