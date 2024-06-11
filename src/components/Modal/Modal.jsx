import React from 'react'
import styles from './Modal.module.css'

export default function Modal({ setOpen, modalContent }) {

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