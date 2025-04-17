import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './tasks/taskSlice'
import resultReducer from './results/resultSlice'
import stateReducer from './states/stateSlice'
import selectedTasksReducer from './selectedTasks/selectedTasksSlice'
const store = configureStore({
  reducer: {
    tasks: taskReducer,
    results: resultReducer,
    states:stateReducer,
    selectedTasks:selectedTasksReducer,
  }
})

export default store
