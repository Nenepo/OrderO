import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../contextorstore/CartContext'
import UserProgressContext from '../contextorstore/UserProgressContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import useHttp from '../hooks/useHttp';
import Error from './Error';
const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}
function Checkout() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('/api/orders', requestConfig,)

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

  const handleClose = () => {
    userProgressCtx.hideCheckout()
  }

  const handleFinish = () => {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
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

  if (data && !error) {
    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleFinish}>
      <h2>Success!</h2>
      <p>Your order is being processed</p>
      <p>We will get back to you shortly</p>
      <p className='modal-actions'>
        <Button onClick={handleFinish}>Okay</Button>

      </p>
    </Modal>
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
        {error && <Error title="failed to submit order" message={error} />}
        <p className="modal-actions">
          {actions}
        </p>
      </form>
    </Modal>
  )
}

export default Checkout