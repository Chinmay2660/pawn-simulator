import './CommandLogs.css'

const CommandLogs = () => {
  const commandList = ["PLACE 0, 0, NORTH, WHITE", "MOVE 2", "LEFT", "RIGHT", "LEFT", "OUTPUT: 0, 0, WEST, WHITE"]
  return (
    <div className="commandlogs-container">
      {commandList?.length > 0 && commandList.map((list, index) => {
        return (
          <div className='command' key={index}>{list}</div>
        )
      })}
      {commandList?.length === 0 && (
        <div className='command' >No command found</div>
      )}
    </div>
  )
}

export default CommandLogs