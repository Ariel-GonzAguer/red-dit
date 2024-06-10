import React from 'react'
import styles from './Modal.module.css'

export default function Modal({ setOpen, modalContent }) {
  // This modal needs be passed an object like this:
  /*   
    const modalContent = {
    text: 'Delete this card forever?',
    close: {text: 'Cancel', class: 'cancel'},
    button_Two: <button className={stylesModal.button_Two} onClick={() => { handleDelete(cardKeyToDelete); setOpen(false) }}>Delete</button>
  }
  */

  return (
    <>
      <dialog className={`${styles[modalContent.type]}`} open>
        <p>{modalContent.text}</p>
        {modalContent.extra_content}
        <button onClick={() => setOpen(false)} className={`${styles[modalContent.close.class]}`}>
          {modalContent.close.text}</button>
      </dialog>
    </>
  )
}