import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'
import {
  updateResults,
  updateStatus
} from '../store/tasks/taskSlice'
import { addResult } from '../store/results/resultSlice'
import { setConnected } from '../store/states/stateSlice'

export const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null)
  const joinedRooms = useRef(new Set())
  const dispatch = useDispatch()

  // 创建 socket 实例并监听事件
  useEffect(() => {
    const socket = io('http://10.16.53.208:8000', {
      transports: ['websocket'],
      reconnection: true,
    })
    socketRef.current = socket

    socket.on('connect', () => {
      console.log('[Socket] 服务器连接成功:', socket.id)
      dispatch(setConnected(true))  
    })

    socket.on('disconnect', () => {
      dispatch(setConnected(false))
      // 标记所有房间连接中断
      joinedRooms.current.forEach(taskId => {
        dispatch(updateStatus({ taskId, key: 'connected', value: false }))
        dispatch(updateStatus({ taskId, key: 'training', value: false }))
      })
    })

    socket.on('disconnected', ({ taskId }) => {
      dispatch(updateStatus({ taskId, key: 'connected', value: false }))
    })

    socket.on('status', ({ taskId, status }) => {
      dispatch(updateStatus({ taskId, key: 'training', value: status === 'running' }))
    })

    socket.on('metrics', ({ taskId, round, testAcc, loss }) => {

      dispatch(addResult({ taskId, result: { round, testAcc, loss } }))
    })

    return () => {
      socket.disconnect()
    }
  }, [dispatch])

  // 加入房间（按任务）
  const joinRoom = useCallback((taskId) => {
    if (!joinedRooms.current.has(taskId) && socketRef.current) {
      socketRef.current.emit('join', taskId)
      joinedRooms.current.add(taskId)
      console.log(`${taskId} join room`);
    }
  }, [])

  const value = {
    socket: socketRef.current,
    joinRoom,
  }

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  )
}
