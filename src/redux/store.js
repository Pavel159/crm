import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import leadSlice from './leadSlice';
import userSlice from './userSlice';
import contactSlice from './contactSlice';
import dealSlice from './dealSlice';
import reportSlice from './reportSlice';

const rootReducer = combineReducers({
  lead: leadSlice,
  user: userSlice,
  contact: contactSlice,
  deal: dealSlice,
  report: reportSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
