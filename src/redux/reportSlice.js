import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  fetchPreviousDealsByUser,
  fetchPreviousDealsForReport,
} from '../http/dealsAPI/previousDealAPI';

export const getPreviousDealsByUser = createAsyncThunk(
  'reports/getPreviousDealsByUser',
  async (_, { rejectWithValue, dispatch }) => {
    const data = await fetchPreviousDealsByUser();
    dispatch(setPreviousDealsToStore(data.rows));
  }
);

export const getPreviousDealsForReport = createAsyncThunk(
  'deals/getPreviousDealsForReport',
  async (id, { rejectWithValue, dispatch }) => {
    if (id) {
      const data = await fetchPreviousDealsForReport(id);
      dispatch(setPreviousDealsToStoreByContact(data.rows));
      return data;
    }
  }
);

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    totalIncome: 0,
    totalExpenses: 0,
    previousDeals: [],
    previousDealsByContact: [],
  },
  reducers: {
    setPreviousDealsToStore(state, action) {
      state.previousDeals = [];
      state.previousDeals.push(action.payload);
    },
    setPreviousDealsToStoreByContact(state, action) {
      state.previousDealsByContact = [];
      state.previousDealsByContact.push(action.payload);
    },
  },
  extraReducers: {},
});

export default reportSlice.reducer;
export const { setPreviousDealsToStore, setPreviousDealsToStoreByContact } =
  reportSlice.actions;
