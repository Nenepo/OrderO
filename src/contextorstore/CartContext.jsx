import { createContext, useReducer } from "react";

// everything must have an id
// the skeleton of what we need and also helps with autocomplete
const CartContext = createContext({
  items: [],
  addItem: (item) => { },
  removeItem: (id) => { }
})

// wwe describe the type of action we want to take and what we want it to do
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    // instead of updating the state directly and creating new instances we just want to add it then increase or decrease the number 
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id)

    //  create a copy of the old array
    const updatedItems = [...state.items];

    //  since it starts from 0, we use -1 if there are no items
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 })
    }
    return { ...state, items: updatedItems };


  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )

    const existingCartItem = state.items[existingCartItemIndex]
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1)
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      }
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };

  }

  return state;
}

// we add the reducer to the context provider so it can be accessed and used in and by other compoennts without prop drilling
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item })
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id })
  }



  const cartContext = {
    items: cart.items,
    addItem,
    removeItem
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext