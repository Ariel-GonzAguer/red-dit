// Post.jsx
import React from 'react'

import styles from '../Content.module.css'

export default function Post({ posts }) {

  return (
    <>
      {posts.map((post) => {
        // console.log(post)
        return (
          <li key={post.id} className={styles.post} >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <img loading="lazy" src={post.imageUrl} alt={post.title} className={styles.postImage} />
            <p>{post.author}</p><br />
            <p>Comments<br /> {post.numOfComments}</p>
          </li>
        )
      })}
    </>
  )
}

