import React from 'react'

import styles from '../Content.module.css'

export default function Post({ posts }) {

  return (
    <>
      {posts.map((post) => (
        <li key={post.id} className={styles.post}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <img src={post.imageUrl} alt={post.title} className={styles.postImage} />
        </li>
      ))}
    </>
  )
}

