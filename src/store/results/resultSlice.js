import { createSlice } from "@reduxjs/toolkit"
import { loadResultsFromLocal, saveResultsToLocal } from "./resultUtils"

const initialState = {
  results: loadResultsFromLocal()
}

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addResult: (state, action) => {
      const { taskId, result } = action.payload
      if (state.results && !state.results[taskId]) {
        state.results[taskId] = []
      }
      state.results[taskId].push(result)
      saveResultsToLocal(state.results)
    },
    clearResults: (state, action) => {
      const taskId= action.payload
      if(state.results){
        state.results[taskId] = []
      saveResultsToLocal(state.results)
      }
    },
    deleteAllResults: (state) => {
      state.results = {}
      saveResultsToLocal(state.results)
    }
  }
})

export const { addResult, clearResults, deleteAllResults } = resultSlice.actions
export default resultSlice.reducer
