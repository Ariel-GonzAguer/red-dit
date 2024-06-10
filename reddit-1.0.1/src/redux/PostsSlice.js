import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null
};

export const setPosts = createAsyncThunk('posts/setPosts', async (_, { getState }) => {
  const state = getState();
  const { accessToken } = state.auth;

  const response = await fetch('https://oauth.reddit.com/r/all/hot', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'User-Agent': 'red-dit'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

   const data = await response.json();
  const posts = data.data.children.map(child => ({
    id: child.data.id,
    title: child.data.title,
    imageUrl: child.data.url, // Assuming this is the URL of the original image
    // Add other properties as needed
  }));

  return posts;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(setPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
})

export default postsSlice.reducer;
export const postsSelector = state => state.posts.posts;
export const postErrorSelector = state => state.posts.error;
export const postLoadingSelector = state => state.posts.loading;
