import React, { useContext } from 'react'
import { currencyFormatter } from '../util/formatting'
import CartContext from '../contextorstore/CartContext'

function CartItem({ item }) {
  
  const cartCtx = useContext(CartContext)
  
  const {addItem, removeItem} = cartCtx

  return (
    <li className='cart-item'>
      <p>
        {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
      </p>
      <p className='cart-item-actions'>
        <button onClick={() => removeItem(item.id)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => addItem(item)}>+</button>
      </p>
    </li>
  )
}

export default CartItem