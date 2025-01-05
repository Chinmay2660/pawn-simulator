import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commandData: []
}

export const commandSlice = createSlice({
    name: 'command',
    initialState,
    reducers: {
        setCommand: (state, action) => {
            state.commandData = action.payload
        },
    },
})

export const { setCommand } = commandSlice.actions

export default commandSlice.reducer