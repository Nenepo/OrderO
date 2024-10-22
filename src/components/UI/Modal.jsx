// we use portal so we can use the modal component from anyhwhere in our component tree but is ony injecting the dialog in a specific place in our html file

// we create portal and we pass the jsx code as the first argument and link to the dom as the second argument

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"

// when we close the modal by pressing the `esc` key the dialog would be close by the browser but the user progress does not change
export default function Modal({ children, open, className = '', onClose }) {

  const dialog = useRef()

  useEffect(() => {
    const modal = dialog.current
    if (open) {
      modal.showModal() // this is a built in method in js that opens the modal
    }
    return () => modal.close();
  }, [open]);


  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>, document.getElementById('modal')
  )
}