import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    commandListData: [],
    position: {
        row: null,
        column: null,
        direction: null,
        color: null
    }
}

export const commandSlice = createSlice({
    name: 'command',
    initialState,
    reducers: {
        setCommandList: (state, action) => {
            state.commandListData = [action.payload, ...state.commandListData]; // new data first and then old data
        },
        resetCommandList: (state, action) => {
            state.commandListData = []; // reset reducer to clear
        },
        setPosition: (state, action) => {
            state.position = action.payload
        },
    },
})

export const { setCommandList, resetCommandList, setPosition } = commandSlice.actions

export default commandSlice.reducer