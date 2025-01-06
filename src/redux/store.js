import { configureStore } from '@reduxjs/toolkit'
import commandReducer from './Reducers/commandSlice'

export const store = configureStore({
  reducer: {
    commandData: commandReducer
  },
})