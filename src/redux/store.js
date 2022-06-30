import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import leadsSlice from './leads/leadsSlice';

const rootReducer = combineReducers({
  leads: leadsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
