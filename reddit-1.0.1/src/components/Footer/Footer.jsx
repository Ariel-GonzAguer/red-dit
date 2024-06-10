import React from 'react'
import styles from './Footer.module.css'
import ErrorBtn from './ErrorBtn/ErrorBtn'


export default function Footer() {




  return (
    <footer className={styles.footer}>
      <p>red-dit by Ariel Gonzales Agüero</p>
      <ErrorBtn />
    </footer>
  )
}