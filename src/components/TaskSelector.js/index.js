import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd'
import { toggleTask } from '../../store/selectedTasks/selectedTasksSlice'
import { useEffect } from 'react'
export default function TaskSelector({ tasks }) {
  const dispatch = useDispatch()
  const selectedTasks = useSelector(state => state.selectedTasks.selectedTasks)
  const handleToggle = (taskName) => {
    dispatch(toggleTask(taskName))
  }


  return (
    <div style={{ padding: '12px' }}>
      {Object.values(tasks).map(task => (
        <Checkbox
          key={task.taskId}
          checked={selectedTasks.includes(task.name)}
          onChange={() => handleToggle(task.name)}
          style={{  
            transform: 'scale(1.1)',
            display:'flex'
          }}
        >
          <span style={{ fontSize: '14px' }}>{task.name}</span>
        </Checkbox>
      ))}
    </div>
  )
}
