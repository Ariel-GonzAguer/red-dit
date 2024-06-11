import React from 'react'
import styles from './Content.module.css'
import MainContent from './MainContent/MainContent-Container'
import Secondary from './SecondaryContent/SecondaryContent-Container'

export default function Content() {

  return (
    <section className={styles.content}>
      <MainContent />
      <Secondary />
    </section>
  )
}