// MainContent-Container.jsx
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from '../Content.module.css'
import Post from './Post'

import { postsSelector, postErrorSelector, postLoadingSelector, setPosts } from '../../../redux/PostsSlice'

export default function MainContent() {
  const dispatch = useDispatch()
  const posts = useSelector(postsSelector)
  const postLoading = useSelector(postLoadingSelector)
  const postError = useSelector(postErrorSelector)

  useEffect(() => {
    dispatch(setPosts());
  }, [dispatch])

  return (
    <>
      <section className={styles.mainContent}>
        {postError && <h2>{postError}</h2>}
        {
          postLoading
            ? <h2>Loading...</h2>
            :
            (<ul>
              <Post posts={posts} />
            </ul>)
        }
      </section>
    </>
  )
}