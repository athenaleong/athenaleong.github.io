import DesktopTabDict,{ DesktopTabType }  from '../type/tab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    tabs: DesktopTabDict,
    maxZIndex: number
} = {
    tabs: {},
    maxZIndex: 0
}



const tabSlice = createSlice({
    name: 'tab',
    initialState: initialState,
    reducers: {
        addTab: (state, action: PayloadAction<{id: string, props:DesktopTabType}>) => {
            state.tabs[action.payload.id] = {...action.payload.props, zIndex: state.maxZIndex++};
        },
        popTab: (state, action: PayloadAction<{id: string}>) => {
            if (state.tabs[action.payload.id])
                delete state.tabs[action.payload.id];
        },
        updateTab: (state, action: PayloadAction<{id: string, props:DesktopTabType}>) => {
            state.tabs[action.payload.id] = {...action.payload.props, zIndex: state.maxZIndex++};
        },
        clearTab(state) {
            state.tabs= {};
            state.maxZIndex = 0;
        },
        bringTabToFront: (state, action: PayloadAction<{id: string}>) => {
            if (state.tabs[action.payload.id] && (state.tabs[action.payload.id].zIndex ?? 0) < state.maxZIndex) {
                state.tabs[action.payload.id].zIndex = state.maxZIndex++;
            }
        }
    }
})

export const {
    addTab,
    popTab,
    updateTab,
    clearTab,
    bringTabToFront
} = tabSlice.actions;

export default tabSlice.reducer;

