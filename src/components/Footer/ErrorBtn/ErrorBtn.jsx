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
        <label htmlFor='email'>Email:</label><br />
        <input type='email' name='email' id='email'  placeholder='myemail@gmail.com' required /><br />

        <label htmlFor='message'>Please describe the error the best You can</label><br />
        <textarea name='message' id='message' required /><br />
        <button type='submit'>Submit</button>
      </form>
  }

  return (
    <>
      {
        open && (<Modal setOpen={setOpen} modalContent={modalContent} type={[modalContent.type]} />)
      }
      <button className={styles.errorBtn} onClick={() => setOpen(true)}>
        Report a error
      </button>
    </>
  )
}




