import './App.css';
import { Switch, Route } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js' 
import { CartProvider } from "use-shopping-cart";
import { useContext } from "react";
import { ModalContext } from "./ModalContext"
import Marquee from "react-fast-marquee";


import Navbar from "./components/Navbar"

import Shop from "./pages/Shop" 
import Product from "./pages/Product"
import CartModal from "./components/CartModal"
import Result from "./pages/Result"

const stripeKey = 'pk_test_51JEYLzI5axcIykJko2VXlodil22iVSjZ58IFvODU039VdHUKC9MxGLPLfZP9dn1aagi131H5BDoNOJsKuj2AvgJj00KNnHunqn'

function App() {

  const { isModalOpen } = useContext(ModalContext)

  return (
    <div className="App">

      <CartProvider 
        mode="checkout-session"
        stripe={stripeKey}
        currency="AUD"
        // cartMode="client-only"
        >
        
        {isModalOpen && <CartModal /> }
        <Navbar /> 
        <main>
        <Marquee 
          style={{
            height: "2em",
            fontStyle: "italic",
            fontSize: "2em"
            }}
          speed="50"
          gradient={false}
        >
           FREE SHIPPING ON ORDERS OVER $100!
        </Marquee>
          <Switch>
            <Route exact path="/">
              <Shop />
            </Route>
            <Route path="/shop/:item">
              <Product />
            </Route>
            <Route path="/shop">
              <Shop />
            </Route>
            <Route path="/result">
              <Result />
            </Route>
          </Switch>
        </main>
        </CartProvider>
      
    </div>
  );
}

export default App;
