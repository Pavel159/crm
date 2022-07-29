import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import {
  createContact,
  fetchContacts,
  fetchSingleContact,
  removeContact,
  updateContact,
} from '../http/contactAPI';

export const getContacts = createAsyncThunk(
  'contacts/getContacts',
  async (_, { rejectWithValue, dispatch }) => {
    const data = await fetchContacts();
    dispatch(setContactsToStore(data.rows));
  }
);

export const getContactById = createAsyncThunk(
  'contacts/getContactById',
  async (id, { rejectWithValue, dispatch }) => {
    const currentContact = await fetchSingleContact(id);
    dispatch(setCurrentContact(currentContact));
  }
);

export const addNewContact = createAsyncThunk(
  'contacts/addNewContact',
  async (contact, { rejectWithValue, dispatch }) => {
    const data = await createContact(contact);
    const userId = localStorage.getItem('userId');
    const newContact = {
      id: data.id,
      name: data.name,
      phone: data.phone,
      messeger: data.messeger,
      info: data.info,
      date: data.date,
      userId: userId,
    };
    dispatch(addNewContactToStore(newContact));
    return data;
  }
);

export const removeContactById = createAsyncThunk(
  'contacts/removeContactById',
  async (id, { rejectWithValue, dispatch }) => {
    await removeContact(id);
    dispatch(removeContactFromStore(id));
  }
);

export const updateContactById = createAsyncThunk(
  'contacts/updateContactById',
  async (contact, { rejectWithValue, dispatch }) => {
    const currentContact = await updateContact(contact);
    dispatch(setCurrentContact(currentContact));
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    currentContact: null,
  },
  reducers: {
    setContactsToStore(state, action) {
      state.contacts = action.payload;
    },
    setCurrentContact(state, action) {
      state.currentContact = action.payload;
    },
    addNewContactToStore(state, action) {
      state.contacts.push(action.payload);
    },
    removeContactFromStore(state, action) {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
  extraReducers: {},
});

export default contactSlice.reducer;
export const {
  setContactsToStore,
  setCurrentContact,
  addNewContactToStore,
  removeContactFromStore,
} = contactSlice.actions;
