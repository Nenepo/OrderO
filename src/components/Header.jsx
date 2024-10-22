import React, { useContext } from 'react'
import Button from './UI/Button'
import CartContext from '../contextorstore/CartContext'
import UserProgressContext from '../contextorstore/UserProgressContext';

function Header() {

  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // reduce allows us educe an array to a single  number
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item ) => {
    return totalNumberOfItems + item.quantity
  }, 0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">

      <div id="title">
        <img src="/logo.jpg" alt="armani's logo" />
        <h1>OrderO</h1>
      </div>
      <nav>
      <Button className="text-button" textOnly={true} onClick={handleShowCart}>Cart {totalCartItems}</Button>

      </nav>


    </header>
  )
}

export default Header