import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from 'redux'
import tab from './tab';

const reducer = combineReducers({
	tab,
});

export type RootState = ReturnType<typeof reducer>

const store = configureStore({
	reducer,	
});

export default store