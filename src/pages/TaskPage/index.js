import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Settings from '../../components/Settings'
import { updateParameter, resetParameters } from '../../store/tasks/taskSlice'
import { clearResults } from '../../store/results/resultSlice'
import { request } from '../../api/axios/request'
import { useSocket } from '../../socket/useSocket'
import Status from '../../components/Status'
import Charts from '../../components/Charts'

export default function TaskPage() {
  const { taskId } = useParams()
  const task = useSelector(state => state.tasks.tasks[taskId])
  const result = useSelector(state => state.results.results[taskId])
  const isConnected = useSelector(state => state.states.connected)
  const dispatch = useDispatch()
  const { joinRoom } = useSocket()

  useEffect(() => {
    if (taskId) {
      joinRoom(taskId)
    }
  }, [taskId, joinRoom])

  if (!task) return <div>任务不存在</div>

  const onUpdateParam = (key, value) => {
    dispatch(updateParameter({ taskId, key, value }))
  }

  const onStart = async () => {
    dispatch(clearResults(taskId))
    await request.post('/train', { ...task.parameters, taskId })
  }

  const onStop = async () => {
      await request.post('/stop', { taskId })
  }

  const onReset = () => {
    dispatch(resetParameters(taskId))
  }

  return (
    <div>
      <Settings
        task={task}
        onUpdateParam={onUpdateParam}
        onStart={onStart}
        onStop={onStop}
        onReset={onReset}
      />
      <Status task={task} isConnected={isConnected} />
      <Charts result={result} />
    </div>
  )
}
