import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact} from '../api';

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchContacts',
  async (token, { rejectWithValue }) => {
    try {
      return await fetchContacts(token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      return await addContact(contact, token);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeContactAsync = createAsyncThunk(
  'contacts/removeContact',
  async (contactId, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      await removeContact(contactId, token);
      return contactId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filter: '', 
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addContactAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeContactAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload);
      });
  },
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
