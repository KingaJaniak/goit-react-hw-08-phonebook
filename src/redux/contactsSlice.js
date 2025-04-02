import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContact, removeContact, updateContact } from '../api'; 

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
      const data = await addContact(contact, token);
      console.log('Contact added:', data); 
      return data; 
    } catch (error) {
      console.error('Error adding contact:', error);
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


export const updateContactAsync = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updatedContact }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;  
    try {
      const data = await updateContact(contactId, updatedContact, token);  
      return data;  
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
  },
  reducers: {},
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
      })
      .addCase(updateContactAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex(contact => contact.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;  
        }
      });
  },
});

export default contactsSlice.reducer;