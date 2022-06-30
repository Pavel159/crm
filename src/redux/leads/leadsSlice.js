import { createSlice } from '@reduxjs/toolkit';

const leadsSlice = createSlice({
  name: 'leads',
  initialState: {
    leads: [
      {
        title: 'Первый лид',
        name: 'Вася',
        contacts: { phone: '0935548437', messeger: '@pavel_147' },
        info: 'Какая-то инфа',
        date: '30.06.22',
      },
      {
        title: 'Второй лид',
        name: 'Не Вася',
        contacts: { phone: '0937777777', messeger: '@vasya_147' },
        info: 'Еще какая-то инфа',
        date: '30.06.22',
      },
    ],
  },
  reducers: {
    addLead(state, action) {
      state.leads.push(action.payload);
    },
    removeLead(state) {
      state.leads.pop();
    },
  },
});

export default leadsSlice.reducer;
export const { addLead, removeLead } = leadsSlice.actions;
