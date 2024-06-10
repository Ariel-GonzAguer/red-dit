import React from 'react'
import styles from '../Header.module.css'
import reddit from '../../../assets/reddit-logo-by-Md-Tanvirul-Haque.png'


export default function Banner() {

  return (
    <div className={styles.banner}>
      <h1>Red-dit</h1>
      <img src={reddit} alt='reddit logo' />
    </div>
  )
}