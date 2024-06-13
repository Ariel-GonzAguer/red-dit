import React from 'react'
import { useDispatch } from 'react-redux'
import { clearAccessToken } from '../../../redux/AccessTokenSlice'

import styles from '../Header.module.css'

export default function LogOutBtn() {
  const dispatch = useDispatch()

  function logout(e) {
    e.preventDefault();
    dispatch(clearAccessToken());
    window.localStorage.removeItem('token');
  }

  return (
    <button className={styles.LogOutBtn} onClick={logout}>LogOut</button>
  )
}