import { useShoppingCart } from 'use-shopping-cart';
import CartItem from "./CartItem"
import "./CartModal.css"
import { useContext } from "react";
import { ModalContext } from "../ModalContext"
import useCheckout from '../utility/useCheckout'



export default function CartModal() {

    const { cartDetails, clearCart, formattedTotalPrice } = useShoppingCart();

    const { toggleCartModal } = useContext(ModalContext)

    const cartItems = Object.keys(cartDetails).map(key => cartDetails[key])

    const handleCheckout = useCheckout()

    return (
        
        <div className="cart-modal-wrap">
            <div 
                className="cart-modal-overlay"
                onClick={toggleCartModal}
            >
            </div>
            <div className="cart-modal">
                <div className="cart-modal-top">
                    <h2 className="cart-modal-heading">Your Cart</h2>
                    <span 
                        className="close-modal"
                        onClick={toggleCartModal}
                        style={{ 
                            cursor: "pointer",
                            fontWeight: "600"
                            }}
                    >X
                    </span>
                </div>
                
                <div className="cart-item-grid">
                    {cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} cartItem={cartItem} />
                    ))}
                </div>
                <div className="cart-modal-bottom">
                    <div className="cart-modal-subtotal-div">
                        <p>
                            Subtotal:
                        </p>
                        <p className="cart-modal-subtotal">
                            {formattedTotalPrice}
                        </p>
                    </div>
                    <div className="bottom-buttons">
                        <button 
                            className="cart-modal-button"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                        <button className="cart-modal-button" onClick={toggleCartModal}>
                            Continue Shopping
                        </button>
                        <button 
                            className="cart-modal-button"
                            onClick={clearCart}
                            style={{cursor: "pointer"}}
                            >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
           
        </div>

    )



}
