import React from 'react'
import Banner from './Banner/Banner'
import SearchBar from './SearchBar/SearchBar'
import styles from './Header.module.css'

export default function Header() {

  return (
    <header className={styles.header}>
      <Banner />
      <SearchBar />
    </header>
  )
}