import { useSelector } from 'react-redux'
import './CommandLogs.css'

const CommandLogs = () => {
  const commandList = useSelector((state) => state.commandData.commandListData)
  return (
    <div className="commandlogs-container">
      {commandList?.length > 0 && commandList.map((list, index) => {
        return (
          <div className='command' key={index}>{list}</div>
        )
      })}
      {commandList?.length === 0 && (
        <div className='command' >No command found</div> // if list empty then show No command found
      )}
    </div>
  )
}

export default CommandLogs