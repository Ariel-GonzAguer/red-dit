import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  subcategories: [],
  loading: false,
  error: null
};

export const setSubcategories = createAsyncThunk('subcategories/setSubcategories', async (_, { getState }) => {
  const state = getState();
  const { accessToken } = state.auth;

  const response = await fetch('https://oauth.reddit.com/subreddits/popular', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'User-Agent': 'red-dit'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch subcategories');
  }

  const data = await response.json();
  return data.data.children.map(child => child.data);
});

const subcategoriesSlice = createSlice({
  name: 'subcategories',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setSubcategories.fulfilled, (state, action) => {
        state.subcategories = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(setSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

export default subcategoriesSlice.reducer;
export const subcategoriesSelector = state => state.subcategories.subcategories;
export const subcategoriesErrorSelector = state => state.subcategories.error;
export const subcategoriesLoadingSelector = state => state.subcategories.loading;
