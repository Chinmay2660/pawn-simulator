import { useState } from "react";
import './CommandsExecutor.css';

const CommandsExecutor = () => {
    const [place, setPlace] = useState({
        row: null,
        column: null,
        direction: 'NORTH',
        color: 'WHITE'
    })

    const handleCommand = (command) => {
        const [commandType, commandValue] = command.split(' ');
        console.log(commandType)
        switch (commandType) {
            case 'PLACE':
                break;
            case 'MOVE':
                break;
            case 'LEFT':
                break;
            case 'RIGHT':
                break;
            case 'REPORT':
                break;
            default:
                alert('Invalid command');
        }
    }

    const handlePlacement = (e) => {
        if (place?.row.trim() && place?.column.trim()) {
            handleCommand(`PLACE ${place?.row},${place?.column},${place?.direction},${place?.color}`);
            setRow('');
            setColumn('');
        }
    };

    return (
        <div className="controls">
            <form onSubmit={handlePlacement} className="place-controls">
                <input
                    type="number"
                    placeholder="Row"
                    value={place?.row}
                    onChange={(e) => setPlace((prevPlace) => ({
                        ...prevPlace,
                        row: e.target.value
                    }))}
                />
                <input
                    type="number"
                    placeholder="Column"
                    value={place?.column}
                    onChange={(e) => setPlace((prevPlace) => ({
                        ...prevPlace,
                        column: e.target.value
                    }))}
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

            <button className='btn report-btn' onClick={() => handleCommand('REPORT')}>Report</button>
        </div>
    );
};

export default CommandsExecutor;
