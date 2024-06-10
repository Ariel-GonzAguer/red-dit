// store.js
import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './PostsSlice'
import subcategoriesSlice from './SubcategoriesSlice'
import authSlice from './AccessTokenSlice'

const store = configureStore({
  reducer: {
    posts: postsSlice,
    subcategories: subcategoriesSlice,
    auth: authSlice,
  }
})

export default store