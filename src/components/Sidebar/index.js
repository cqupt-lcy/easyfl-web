import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { createTask, deleteTask, renameTask } from '../../store/tasks/taskSlice'
import './index.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Dropdown } from 'antd'
function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [editingId, setEditingId] = useState(null)
  const [newName, setNewName] = useState('')
  const tasks = Object.values(useSelector(state => state.tasks.tasks))

  const handleAddTask = () => {
    dispatch(createTask()) // name 可选，默认自动生成
  }
  const handleMenuClick = (e, task) => {
    if (e.key === '1') {
      setEditingId(task.taskId)
      setNewName(task.name)
    }
  }

  const handleDeleteTask = (taskId) => {
    // 如果删除的是当前正在访问的任务，则跳转到 dashboard
    if (location.pathname.includes(taskId)) {
      navigate('/dashboard')
    }
    dispatch(deleteTask(taskId))
  }

  const handleRenameSubmit = (taskId) => {
    if (newName.trim()) {
      dispatch(renameTask({ taskId, newName })) // 假设你有这个 action
      setEditingId(null)
      setNewName('')
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>任务列表</h2>
        <button className="add-task-btn" onClick={handleAddTask}>+ 添加</button>
      </div>

      <div className="task-list">
        {
          tasks.map(task => {
            const menuProps = {
              items: [{ label: '重命名', key: '1' }],
              onClick: e => handleMenuClick(e, task),
            }
            return (
              <Dropdown menu={menuProps} trigger={'contextMenu'} key={task.taskId}>
                {
                  editingId === task.taskId ? (
                    <input
                      type="text"
                      value={newName}
                      autoFocus
                      onChange={(e) => setNewName(e.target.value)}
                      onBlur={() => handleRenameSubmit(task.taskId)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSubmit(task.taskId)
                      }}
                      style={{ width: '50%' }}
                    />
                  ) : (
                    <div className='task-item'>
                      <NavLink
                        to={`/task/${task.taskId}`}
                        style={{ display: 'block' }}
                        className={"task-link"}
                        key={task.taskId}
                      >
                        {task.name}
                      </NavLink>
                      <button
                        className="del-btn"
                        onClick={() => handleDeleteTask(task.taskId)}
                        title="删除任务"
                      >
                        ✕
                      </button>
                    </div>
                  )
                }
              </Dropdown>

              // <div key={task.id} className="task-item">
              //   <NavLink to={`/task/${task.taskId}`} className="task-link">
              //     {task.name}
              //   </NavLink>
              //   <button
              //     className="del-btn"
              //     onClick={() => handleDeleteTask(task.taskId)}
              //     title="删除任务"
              //   >
              //     ✕
              //   </button>
              // </div>
            )
          })}
      </div>

      <hr />

      <div className="sidebar-menu">
        <Link to="/dashboard" className="menu-item">总控板</Link>
      </div>
    </div>
  )
}

export default Sidebar
