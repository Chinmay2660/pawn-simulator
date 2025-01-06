import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commandData: [],
    position: {
        row: 0,
        column: 0,
        direction: 'NORTH',
        color: 'WHITE'
    }
}

export const commandSlice = createSlice({
    name: 'command',
    initialState,
    reducers: {
        setCommand: (state, action) => {
            state.commandData = action.payload
        },
        setPosition: (state, action) => {
            state.position = action.payload
        },
    },
})

export const { setCommand, setPosition } = commandSlice.actions

export default commandSlice.reducer