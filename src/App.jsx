
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./contextorstore/CartContext";
import { UserProgressContextProvider } from "./contextorstore/UserProgressContext";

function App() {


  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Meals />
          <Cart/>
          <Checkout/>
        </CartContextProvider>
      </UserProgressContextProvider>


    </>
  );
}

export default App;
