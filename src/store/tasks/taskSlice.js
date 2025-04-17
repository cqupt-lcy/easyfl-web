import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { saveToLocalStorage, loadFromLocalStorage } from './taskUtils'
import { defaultParameters } from './defaultParams'
 const initialState = {
  tasks: loadFromLocalStorage()
  
}
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    createTask: (state, action) => {
      const id = uuidv4()
      state.tasks[id] = {
        taskId:id,
        name: action.payload?.name || `任务${Object.keys(state.tasks).length + 1}`,
        parameters: { ...defaultParameters },
        status: {
          training: false,
        }
      }
      saveToLocalStorage(state.tasks)
    },
    deleteTask: (state, action) => {
      delete state.tasks[action.payload]
      saveToLocalStorage(state.tasks)
    },
    renameTask: (state, action) => {
      const { taskId, newName } = action.payload
      if (state.tasks[taskId]) {
        state.tasks[taskId].name = newName
        saveToLocalStorage(state.tasks)
      }
    },
    updateParameter: (state, action) => {
      const { taskId, key, value } = action.payload
      if (state.tasks[taskId]) {
        state.tasks[taskId].parameters[key] = value
        saveToLocalStorage(state.tasks)
      }
    },
    resetParameters: (state, action) => {
      const taskId = action.payload
      if (state.tasks[taskId]) {
        state.tasks[taskId].parameters = { ...defaultParameters }
        saveToLocalStorage(state.tasks)
      }
    },

    updateStatus: (state, action) => {
      const {taskId, key, value } = action.payload
      console.log(`状态更新了:${taskId}**${key}**${value}`);
      if (state.tasks[taskId]) {
        state.tasks[taskId].status[key] = value
        saveToLocalStorage(state.tasks)
      }
    }
  }
})

export const {
  createTask,
  deleteTask,
  renameTask,
  updateParameter,
  resetParameters,
  updateStatus
} = taskSlice.actions

export default taskSlice.reducer
