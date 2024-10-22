import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../contextorstore/CartContext'
import UserProgressContext from '../contextorstore/UserProgressContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import useHttp from '../hooks/useHttp';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}
function Checkout() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest } = useHttp('http://localhost:3000/orders', requestConfig,)

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

  const handleClose = () => {
    userProgressCtx.hideCheckout()
  }

  function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    //  extract user data easily from form data  object
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(JSON.stringify({
      order: {
        items: cartCtx.items,
        customer: customerData

      }
    }));

  }

  let actions = (<>
    <Button type="button" textOnly onClick={handleClose}>Close</Button>
    <Button>Submit Order</Button>
  </>
  )
  if (isSending) {
    actions = <span>Sending order...</span>
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>

      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full name" type="text" id="name" />
        <Input label="Email" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  )
}

export default Checkout