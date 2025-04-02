import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchCurrentUser } from '../api'; 

export const loginUserAsync = createAsyncThunk(
  'auth/loginUser',
  async (userCredentials, { rejectWithValue }) => {
    const { email, password } = userCredentials;

    try {
      const data = await loginUser(email, password);  
      return data; 
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

export const registerUserAsync = createAsyncThunk(
  'auth/registerUser',
  async (userCredentials, { rejectWithValue }) => {
    try {
      const data = await registerUser(userCredentials.name, userCredentials.email, userCredentials.password);
      return data;
    } catch (error) {
      if (error.response?.data?.code === 11000) {
        return rejectWithValue({ message: 'Ten e-mail jest już zajęty. Wybierz inny.' });
      }
      return rejectWithValue(error.response?.data || { message: 'Wystąpił nieoczekiwany błąd.' });
    }
  }
);

export const fetchCurrentUserAsync = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (token, { rejectWithValue }) => {
    try {
      const data = await fetchCurrentUser(token); 
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    status: 'idle', 
  },
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true; 
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(fetchCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchCurrentUserAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
