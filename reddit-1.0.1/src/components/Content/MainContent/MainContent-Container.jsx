import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../Content.module.css'
// import { postExamples } from '../../../redux/examples'
import Post from './Post'

import { setPosts } from '../../../redux/PostsSlice'
import { postsSelector, postErrorSelector, postLoadingSelector } from '../../../redux/PostsSlice'

export default function MainContent(z) {
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
        {postError && <h2>{postErrorSelector}</h2>}

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