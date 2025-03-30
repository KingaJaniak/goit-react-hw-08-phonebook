import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContactAPI, removeContactAPI } from '../api';

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetchContacts();
    return response;
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async contact => {
    const response = await addContactAPI(contact);
    return response;
  }
);

export const removeContactAsync = createAsyncThunk(
  'contacts/removeContact',
  async id => {
    const response = await removeContactAPI(id);
    return response;
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContactsAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeContactAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload
        );
      });
  },
});

export default contactsSlice.reducer;
