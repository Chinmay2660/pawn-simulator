import { configureStore } from '@reduxjs/toolkit'
import commandReducer from './Reducer/commandSlice'

export const store = configureStore({
  reducer: {
    commandData: commandReducer
  },
})