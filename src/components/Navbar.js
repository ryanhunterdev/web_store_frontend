import { Link } from 'react-router-dom'
import CartSummary from './CartSummary'
import useCheckout from '../utility/useCheckout'
import { useShoppingCart } from 'use-shopping-cart'
import './Navbar.css'
import { useState } from 'react'
 
const Navbar = () => {

    const handleCheckout = useCheckout()
    const { cartCount } = useShoppingCart()


    return ( 
        <header>
            <h1 className="nav-header">
                <Link to="/shop">rekkids n merch</Link>
            </h1>
          
            <div className="nav-checkout">
                <CartSummary />
            </div>
        </header>
    );
}
 
export default Navbar;