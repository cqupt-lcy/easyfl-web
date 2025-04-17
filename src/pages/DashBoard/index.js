import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { transformResultsToChartData } from '../../hooks/useChartDataIncremental.js'
import DashBoardCharts from '../../components/DashBoardCharts'
import { useMemo } from 'react'
import TaskSelector from '../../components/TaskSelector.js'
import HistoryLogs from '../../components/HistoryLogs/index.js'
import { useDispatch } from 'react-redux'
import { throttle } from '../../utils/throttle.js'
export default function DashBoard() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks)
  const tasksArray = Object.values(tasks)
  const results = useSelector(state => state.results.results)
  const taskNames = tasksArray.reduce((prev, current) => {
    prev.push(current.name)
    return prev
  }, [])
  const selectedTasks = useSelector(state => state.selectedTasks.selectedTasks)
  const throttledTransformFunc = useRef(
    throttle(transformResultsToChartData,5000)
  ).current
  const chartData = throttledTransformFunc({results,tasks,taskNames})
  // const chartData = useMemo(()=>{
  //   return transformResultsToChartData({ results, tasks, taskNames })
  // },[results])
  // const chartData = transformResultsToChartData({ results, tasks, taskNames })
  return (
    <div style={{
      marginLeft:'20px'
    }}>
    <div style={{

      display: 'flex',
      background: '#f5f5f5',
      boxSizing: 'border-box',
    }}>
      {/* 左侧任务选择栏 */}
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        overflowY: 'auto',
        flexShrink: 0,
      }}>
        <h4 style={{
          marginBottom: '12px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '16px'
        }}>筛选器</h4>
        <TaskSelector tasks={tasks} />
      </div>

      {/* 右侧图表区域 */}
      <div style={{
        flex: 1,
        background: '#fff',
        borderRadius: '8px',
      }}>
        <DashBoardCharts chartData={chartData} taskNames={selectedTasks} />
      </div>
    </div>
    <HistoryLogs/>
    </div>
  )
}
