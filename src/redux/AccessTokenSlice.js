import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const fetchAccessToken = createAsyncThunk(
  'auth/fetchAccessToken',
  async (authCode) => {
    const clientId = '1ZIeoRNEvLMXs3kQidUQdA';
    const clientSecret = 'Kxf3nlJNKs543yhAQukQkhT9CRp2Aw';
    const redirectUri = 'http://localhost:5173'; //'https://red-dit.netlify.app'

    const response = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`)
      },
      body: `grant_type=authorization_code&code=${authCode}&redirect_uri=${encodeURIComponent(redirectUri)}`
    });
    const data = await response.json();

    try {
      if (data.access_token) {
        window.localStorage.setItem('token', data.access_token);
        return data.access_token;
      }
    } catch (error) {
      throw new Error('Failed to fetch access token');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccessToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccessToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(fetchAccessToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setAccessToken, clearAccessToken, setError } = authSlice.actions;
export const AccessTokenErrorSelector = state => state.auth.error;
export default authSlice.reducer;
