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
        resetCommandList: (state, action) => {
            state.commandListData = [];
        },
        setPosition: (state, action) => {
            state.position = action.payload
        },
    },
})

export const { setCommandList, resetCommandList, setPosition } = commandSlice.actions

export default commandSlice.reducer