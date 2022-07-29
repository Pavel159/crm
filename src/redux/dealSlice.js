import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCurrentDeal,
  fetchCurrentDealsByUser,
  fetchCurrentDealsByContact,
  fetchSingleCurrentDeal,
  removeCurrentDeal,
  updateCurrentDeal,
} from '../http/dealsAPI/currentDealAPI';
import {
  createPreviousDeal,
  fetchPreviousDealsByContact,
  fetchPreviousDealsByUser,
  fetchSinglePreviousDeal,
  removePreviousDeal,
} from '../http/dealsAPI/previousDealAPI';

/*-------------------------CURRENT DEALS THUNK----------------------*/

export const getCurrentDealsByUser = createAsyncThunk(
  'deals/getCurrentDealsByUser',
  async (_, { rejectWithValue, dispatch }) => {
    const data = await fetchCurrentDealsByUser();
    dispatch(setCurrentDealsToStore(data.rows));
  }
);

export const getCurrentDealsByContact = createAsyncThunk(
  'deals/getCurrentDealsByContact',
  async (_, { rejectWithValue, dispatch }) => {
    const data = await fetchCurrentDealsByContact();
    dispatch(setCurrentDealsToStore(data.rows));
    return data;
  }
);

export const getCurrentDealById = createAsyncThunk(
  'deals/getCurrentDealById',
  async (id, { rejectWithValue, dispatch }) => {
    const selectedDeal = await fetchSingleCurrentDeal(id);
    dispatch(setSelectedDeal(selectedDeal));
  }
);

export const addNewCurrentDeal = createAsyncThunk(
  'deals/addNewCurrentDeal',
  async (deal, { rejectWithValue, dispatch }) => {
    const data = await createCurrentDeal(deal);
    const userId = localStorage.getItem('userId');
    const newCurrentDeal = {
      id: data.id,
      title: data.title,
      name: data.name,
      phone: data.phone,
      messeger: data.messeger,
      info: data.info,
      date: data.date,
      totalAmount: data.totalAmount,
      expenses: data.expenses,
      income: data.income,
      userId: userId,
      contactId: data.contactId,
    };
    dispatch(addNewCurrentDealToStore(newCurrentDeal));
  }
);

export const removeCurrentDealById = createAsyncThunk(
  'deals/removeCurrentDealById',
  async (id, { rejectWithValue, dispatch }) => {
    await removeCurrentDeal(id);
    dispatch(removeCurrentDealFromStore(id));
  }
);

export const updateSelectedDealById = createAsyncThunk(
  'deals/updateSelectedDealById',
  async (deal, { rejectWithValue, dispatch }) => {
    const selectedDeal = await updateCurrentDeal(deal);
    dispatch(setSelectedDeal(selectedDeal));
  }
);

/*-------------------------PREVIOUS DEALS THUNK----------------------*/

export const getPreviousDealsByUser = createAsyncThunk(
  'deals/getPreviousDealsByUser',
  async (_, { rejectWithValue, dispatch }) => {
    const data = await fetchPreviousDealsByUser();
    dispatch(setPreviousDealsToStore(data.rows));
  }
);

export const getPreviousDealsByContact = createAsyncThunk(
  'deals/getPreviousDealsByContact',
  async (_, { rejectWithValue, dispatch }) => {
    const data = await fetchPreviousDealsByContact();
    dispatch(setPreviousDealsToStore(data.rows));
    return data;
  }
);

export const getPreviousDealById = createAsyncThunk(
  'deals/getPreviousDealById',
  async (id, { rejectWithValue, dispatch }) => {
    const selectedDeal = await fetchSinglePreviousDeal(id);
    dispatch(setSelectedDeal(selectedDeal));
  }
);

export const addNewPreviousDeal = createAsyncThunk(
  'deals/addNewPreviousDeal',
  async (deal, { rejectWithValue, dispatch }) => {
    const data = await createPreviousDeal(deal);
    const userId = localStorage.getItem('userId');
    const newPreviousDeal = {
      id: data.id,
      title: data.title,
      name: data.name,
      phone: data.phone,
      messeger: data.messeger,
      info: data.info,
      date: data.date,
      totalAmount: data.totalAmount,
      expenses: data.expenses,
      income: data.income,
      userId: userId,
      contactId: data.contactId,
    };
    dispatch(addNewPreviousDealToStore(newPreviousDeal));
  }
);

export const removePreviousDealById = createAsyncThunk(
  'deals/removePreviousDealById',
  async (id, { rejectWithValue, dispatch }) => {
    await removePreviousDeal(id);
    dispatch(removePreviousDealFromStore(id));
  }
);

const dealSlice = createSlice({
  name: 'deals',
  initialState: {
    currentDeals: [],
    previousDeals: [],
    selectedDeal: null,
  },
  reducers: {
    setCurrentDealsToStore(state, action) {
      state.currentDeals = action.payload;
    },
    setSelectedDeal(state, action) {
      state.selectedDeal = action.payload;
    },
    addNewCurrentDealToStore(state, action) {
      state.currentDeals.push(action.payload);
    },
    removeCurrentDealFromStore(state, action) {
      state.currentDeals = state.currentDeals.filter(
        (deal) => deal.id !== action.payload
      );
    },
    setPreviousDealsToStore(state, action) {
      state.previousDeals = action.payload;
    },
    addNewPreviousDealToStore(state, action) {
      state.previousDeals.push(action.payload);
    },
    removePreviousDealFromStore(state, action) {
      state.previousDeals = state.previousDeals.filter(
        (deal) => deal.id !== action.payload
      );
    },
  },
  extraReducers: {},
});

export default dealSlice.reducer;
export const {
  setCurrentDealsToStore,
  setSelectedDeal,
  addNewCurrentDealToStore,
  removeCurrentDealFromStore,
  setPreviousDealsToStore,
  addNewPreviousDealToStore,
  removePreviousDealFromStore,
} = dealSlice.actions;
