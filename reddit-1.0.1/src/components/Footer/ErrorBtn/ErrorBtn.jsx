import React, { useState } from 'react'
import Modal from '../../Modal/Modal'
import styles from '../../Footer/Footer.module.css'


export default function ErrorBtn() {
  const [open, setOpen] = useState(false);

  const modalContent = {
    text: 'Found a bug? Report it here!',
    close: { text: 'Cancel', class: 'cancel' },
    type: 'form',
    extra_content:
      <form onSubmit={(e) => { e.preventDefault(); alert('report sent. Thanks!'); setOpen(false) }}>
        <label htmlFor='email'>Email:</label>
        <input type='email' name='email' id='email'  placeholder='myemail@gmail.com' required />

        <label htmlFor='message'>Describe the bug</label>
        <textarea name='message' id='message' required />
        <button type='submit'>Submit</button>
      </form>
  }

  return (
    <>
      {
        open && (<Modal setOpen={setOpen} modalContent={modalContent} type={[modalContent.type]} />)
      }
      <button className={styles.errorBtn} onClick={() => setOpen(true)}>
        Report a bug
      </button>
    </>
  )
}




