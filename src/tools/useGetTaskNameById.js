import React from 'react'
import { useSelector } from 'react-redux'

export default function GetTaskNameById(tasks,taskId) {
  // const tasks = useSelector(state => state.tasks.tasks)
  if (!tasks || !taskId) return null
  const task = tasks[taskId]
  return task?.name || null
}
