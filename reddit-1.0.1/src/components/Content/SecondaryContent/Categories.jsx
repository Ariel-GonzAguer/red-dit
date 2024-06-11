// Categories.jsx
import React from 'react'
import styles from '../Content.module.css'
import { nanoid } from '@reduxjs/toolkit'

import { setPosts } from '../../../redux/PostsSlice'
import { useDispatch } from 'react-redux'
import redditLogo from '../../../assets/reddit-logo-by-Md-Tanvirul-Haque.png'


export default function Categories({ categories }) {
  const dispatch = useDispatch()

  return (
    <>
      {
        categories.map((category) => {
          // console.log('category:', category)
          return (
            <li key={nanoid()} className={styles.category} data-url={category.url} onClick={() => dispatch(setPosts(category.url))} title={category.title}>
              <p>{category.title}</p>
              <img src={category.icon_img || redditLogo} className={styles.iconSubreddit} />
            </li>
          )
        })
      }

    </>
  )
}