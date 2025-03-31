import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';
import filterReducer from './filterSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, 
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

export default store;