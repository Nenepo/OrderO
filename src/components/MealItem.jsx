import { useContext } from "react"
import Button from "./UI/Button"
import CartContext from "../contextorstore/CartContext"
import { currencyFormatter } from "../util/formatting"
function MealItem({ meal }) {

  const cartCtx = useContext(CartContext)

  function handleAddMealToCart() {
    cartCtx.addItem(meal)
  }
  return (
    <li className="meal-item" >
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMealToCart}>Add to cart</Button>
        </p>
      </article>


    </li>)
}

export default MealItem

// That’s a really cool idea! You can create something like a multi-clipboard tool, where you store multiple copies in an array and paste them one by one. You could build this with JavaScript by capturing Ctrl+C or Cmd+C events and storing the copied text in an array. Then, you could bind keys (like Ctrl+Shift+V) to cycle through and paste each saved item. It could be an interesting side project!

// Here’s a simple outline of how it might work:

// Capture clipboard content using the Clipboard API.
// Store copied items in an array.
// Implement a way to cycle through the array and paste items.