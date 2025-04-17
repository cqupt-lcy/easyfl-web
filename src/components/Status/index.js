import React from 'react'
import { ConnectedFalse,ConnectedTrue } from './Connected'
import { TrainningTrue,TrainningFalse } from './Training'
import './index.css'
export default function Status({task,isConnected}) {

  return (
    <div className='logswrapper'>
      <div className='statuswrapper'>
        {isConnected ? <ConnectedTrue /> : <ConnectedFalse />}
        {task?.status?.training ? <TrainningTrue /> : <TrainningFalse />}
      </div>
    </div>
  )
}
