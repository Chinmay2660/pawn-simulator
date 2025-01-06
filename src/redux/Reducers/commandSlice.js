import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commandListData: [],
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
        setCommandList: (state, action) => {
            state.commandListData = [action.payload, ...state.commandListData];
        },
        setPosition: (state, action) => {
            state.position = action.payload
        },
    },
})

export const { setCommandList, setPosition } = commandSlice.actions

export default commandSlice.reducer