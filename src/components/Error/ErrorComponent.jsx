import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ErrorComponent.module.css'


export default function ErrorComponent() {
  const navigate = useNavigate();


  function goBack(e) {
    e.preventDefault()
    navigate(-1)
  }


  return (
    <section className={styles.ErrorComponent}>
      <p>It seems that this page does not exist or there is an error. You can report the error with the red button in the lower right corner</p>

      <button onClick={goBack} className={styles.goBack}>Go back</button>
    </section>
  )
}