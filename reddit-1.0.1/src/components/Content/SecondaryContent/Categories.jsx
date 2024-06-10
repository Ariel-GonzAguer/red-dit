import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faJar } from '@fortawesome/free-solid-svg-icons'
import styles from '../Content.module.css'
import { nanoid } from '@reduxjs/toolkit'


export default function Categories({ categories }) {


  return (
    <>
      {
        categories.map((category) => (
          <li key={nanoid()} className={styles.category}>
            <p>{category.title}</p>
            <FontAwesomeIcon icon={faJar} />
          </li>
        ))
      }
    </>
  )
}