import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  createLead,
  fetchLeads,
  fetchSingleLead,
  removeLead,
  updateLead,
} from '../http/leadAPI';

export const getLeads = createAsyncThunk(
  'leads/getLeads',
  async (_, { rejectWithValue, dispatch }) => {
    const data = await fetchLeads();
    dispatch(setLeadsToStore(data.rows));
  }
);

export const addNewLead = createAsyncThunk(
  'leads/addNewLead',
  async (lead, { rejectWithValue, dispatch }) => {
    const data = await createLead(lead);
    const userId = localStorage.getItem('userId');
    console.log(data);
    const newLead = {
      id: data.id,
      title: data.title,
      name: data.name,
      phone: data.phone,
      messeger: data.messeger,
      info: data.info,
      date: data.date,
      userId: userId,
    };
    dispatch(addNewLeadToStore(newLead));
  }
);

export const removeLeadById = createAsyncThunk(
  'leads/removeLeadById',
  async (id, { rejectWithValue, dispatch }) => {
    await removeLead(id);
    dispatch(removeLeadFromStore(id));
  }
);

export const getLeadById = createAsyncThunk(
  'leads/getLeadById',
  async (id, { rejectWithValue, dispatch }) => {
    const currentLead = await fetchSingleLead(id);
    dispatch(setCurrentLead(currentLead));
  }
);

export const updateLeadById = createAsyncThunk(
  'leads/updateLeadById',
  async (lead, { rejectWithValue, dispatch }) => {
    const currentLead = await updateLead(lead);
    dispatch(setCurrentLead(currentLead));
  }
);

const leadSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [],
    currentLead: null,
  },
  reducers: {
    setLeadsToStore(state, action) {
      state.leads = action.payload;
    },
    addNewLeadToStore(state, action) {
      state.leads.push(action.payload);
    },
    removeLeadFromStore(state, action) {
      state.leads = state.leads.filter((lead) => lead.id !== action.payload);
    },
    setCurrentLead(state, action) {
      state.currentLead = action.payload;
    },
  },
  extraReducers: {
    [getLeads.fulfilled]: () => console.log('fulfilled'),
    [getLeads.pending]: () => console.log('pending'),
    [getLeads.rejected]: () => console.log('rejected'),
    [removeLeadById.fulfilled]: () => console.log('dfulfilled'),
    [removeLeadById.pending]: () => console.log('dpending'),
    [removeLeadById.rejected]: () => console.log('drejected'),
    [addNewLead.fulfilled]: () => console.log('afulfilled'),
    [addNewLead.pending]: () => console.log('apending'),
    [addNewLead.rejected]: () => console.log('arejected'),
  },
});

export default leadSlice.reducer;
export const {
  setLeadsToStore,
  removeLeadFromStore,
  addNewLeadToStore,
  setCurrentLead,
} = leadSlice.actions;
