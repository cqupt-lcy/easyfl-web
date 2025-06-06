import { useContext } from 'react'
import { SocketContext } from './SocketProvider'
export const useSocket = () => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used inside a <SocketProvider>")
  }
  return context
}
