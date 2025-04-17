import React from 'react'
import Sidebar from './components/Sidebar'
import routes from './routes'
import {useRoutes} from 'react-router-dom'

export default function App() {
  const routerelement = useRoutes(routes)
  return (
    <div style={{display:'flex',height:'100vh'}}>
      <Sidebar/>
      {routerelement}
    </div>
  )
}
