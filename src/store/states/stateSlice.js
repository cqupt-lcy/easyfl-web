import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    connected: false
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload
    }
  }
})

export const { setConnected } = stateSlice.actions
export default stateSlice.reducer
