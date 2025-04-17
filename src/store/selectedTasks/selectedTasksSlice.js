import { createSlice } from '@reduxjs/toolkit'
import { saveToLocalStorage,loadFromLocalStorage } from './selectedTasksUtils'
const initialState = {
  selectedTasks : loadFromLocalStorage()
}
const selectedTasksSlice = createSlice({
  name: 'selectedTasks',
  initialState,
  reducers: {
    setSelectedTasks: (state, action) => action.payload,
    toggleTask: (state, action) => {
      const name = action.payload
      let newSelected

      if (state.selectedTasks.includes(name)) {
        newSelected = state.selectedTasks.filter(n => n !== name)
      } else {
        newSelected = [...state.selectedTasks, name]
      }
    
      saveToLocalStorage(newSelected)
    
      return {
        ...state,
        selectedTasks: newSelected
      }

    }
  }
})

export const { setSelectedTasks, toggleTask } = selectedTasksSlice.actions
export default selectedTasksSlice.reducer
