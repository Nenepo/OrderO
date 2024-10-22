import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../contextorstore/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../contextorstore/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);


  const { items } = cartCtx

  const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

  const handleCloseCart = () => {
    userProgressCtx.hideCart();
  }

  const handleGoToCheckout =() => {
    userProgressCtx.showCheckout();
  }

  
  return (
    <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>Close</Button>
       {items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
      </p>
    </Modal>
  )
}

export default Cart;