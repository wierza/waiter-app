import { configureStore, combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import initialState from './initialState';
import tablesReducer from './tablesRedux';
import loaderReducer from './loaderRedux';

const reducer = combineReducers({
    tables: tablesReducer,
    loading: loaderReducer,
});

const store = configureStore({
    reducer,
    preloadedState: initialState,
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== 'production', 
});

export default store;