import type DesktopTabDict from '../type/tab';
import type { DesktopTabType } from '../type/tab';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TabState = {
    tabs: DesktopTabDict,
    maxZIndex: number,
    activeId: string | null,
};

const initialState: TabState = {
    tabs: {},
    maxZIndex: 0,
    activeId: null,
}

function focusTab(state: TabState, id: string) {
    const window = state.tabs[id];
    if (!window) return;
    window.minimized = false;
    if (state.activeId !== id) window.zIndex = ++state.maxZIndex;
    state.activeId = id;
}

function focusTopVisibleTab(state: TabState) {
    state.activeId = Object.keys(state.tabs)
        .filter(id => !state.tabs[id].minimized)
        .sort((a, b) => (state.tabs[b].zIndex ?? 0) - (state.tabs[a].zIndex ?? 0))[0] ?? null;
}

const tabSlice = createSlice({
    name: 'tab',
    initialState: initialState,
    reducers: {
        addTab: (state, action: PayloadAction<{id: string, props:DesktopTabType}>) => {
            const { id, props } = action.payload;
            // Opening an existing section restores its window and keeps its position.
            if (!state.tabs[id]) state.tabs[id] = { ...props, minimized: false };
            focusTab(state, id);
        },
        popTab: (state, action: PayloadAction<{id: string}>) => {
            delete state.tabs[action.payload.id];
            if (state.activeId === action.payload.id) focusTopVisibleTab(state);
        },
        updateTab: (state, action: PayloadAction<{id: string, props: Pick<DesktopTabType, 'right' | 'top'>}>) => {
            const window = state.tabs[action.payload.id];
            // A late drag event must not recreate a closed window or change focus.
            if (window) Object.assign(window, action.payload.props);
        },
        minimizeTab: (state, action: PayloadAction<{id: string}>) => {
            const window = state.tabs[action.payload.id];
            if (!window) return;
            window.minimized = true;
            if (state.activeId === action.payload.id) focusTopVisibleTab(state);
        },
        clearTab(state) {
            state.tabs= {};
            state.maxZIndex = 0;
            state.activeId = null;
        },
        bringTabToFront: (state, action: PayloadAction<{id: string}>) => {
            focusTab(state, action.payload.id);
        }
    }
})

export const {
    addTab,
    popTab,
    updateTab,
    minimizeTab,
    clearTab,
    bringTabToFront
} = tabSlice.actions;

export default tabSlice.reducer;

