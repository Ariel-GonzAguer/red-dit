// // PostsSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const initialState = {
//   posts: [],
//   loading: false,
//   error: null
// };

// export const setPosts = createAsyncThunk('posts/setPosts', async (subreddit = 'r/popular', { getState }) => {
//   const state = getState();
//   const { accessToken } = state.auth;

//   const response = await fetch(`https://oauth.reddit.com/${subreddit}`, {
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'User-Agent': 'red-dit'
//     }
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch posts');
//   }

//   const data = await response.json();
//   console.log(data)
//   const posts = data.data.children.map(child => ({
//     totalChild: child.data,
//     id: child.data.id,
//     title: child.data.title,
//     imageUrl: child.data.url,
//     author: child.data.author,
//     thumbnail: child.data.thumbnail,
//     numOfComments: child.data.num_comments,
//     // Add other properties as needed
//   }));
//   // console.log(subreddit)

//   return posts;
// });

// const postsSlice = createSlice({
//   name: 'posts',
//   initialState: initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(setPosts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(setPosts.fulfilled, (state, action) => {
//         state.posts = action.payload;
//         state.loading = false;
//         state.error = false;
//       })
//       .addCase(setPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   }
// })

// export default postsSlice.reducer;
// export const postsSelector = state => state.posts.posts;
// export const postErrorSelector = state => state.posts.error;
// export const postLoadingSelector = state => state.posts.loading;


// PostsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const setPosts = createAsyncThunk(
  'posts/setPosts',
  async (subreddit = 'r/popular', { getState }) => {
    const state = getState();
    const { accessToken } = state.auth;

    // Verifica que el accessToken exista antes de hacer la solicitud
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(`https://oauth.reddit.com/${subreddit}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': 'red-dit', // Asegúrate de que este User-Agent sea apropiado
      },
    });

    // Manejo de errores en la respuesta
    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Failed to fetch posts: ${errorDetails.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const posts = data.data.children.map(child => ({
      totalChild: child.data,
      id: child.data.id,
      title: child.data.title,
      imageUrl: child.data.url,
      author: child.data.author,
      thumbnail: child.data.thumbnail,
      numOfComments: child.data.num_comments,
      // Agrega otras propiedades según sea necesario
    }));

    return posts;
  }
);

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
        state.error = null; // Cambiado a null en vez de false
      })
      .addCase(setPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
export const postsSelector = (state) => state.posts.posts;
export const postErrorSelector = (state) => state.posts.error;
export const postLoadingSelector = (state) => state.posts.loading;
