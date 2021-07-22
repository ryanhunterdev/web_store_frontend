import { useShoppingCart } from 'use-shopping-cart';
import CartItem from "./CartItem"
import "./CartModal.css"
import { useContext } from "react";
import { ModalContext } from "../ModalContext"
import useCheckout from '../utility/useCheckout'
import toast, { Toaster } from 'react-hot-toast';

const itemUpdated = () => toast('Item Updated')
const itemRemoved = () => toast('Item Removed')

export default function CartModal(props) {

    const { cartDetails, clearCart, formattedTotalPrice } = useShoppingCart();

    const { toggleCartModal, isModalOpen } = useContext(ModalContext)

    const cartItems = Object.keys(cartDetails).map(key => cartDetails[key])

    const handleCheckout = useCheckout()

    console.log(props);

    return (
        
        <div className="cart-modal-wrap">
            <div 
                className="cart-modal-overlay"
                onClick={toggleCartModal}
            >
            </div>
            <div 
                className={"cart-modal"}>
                <div className="cart-modal-top">
                    <Toaster 
                        toastOptions={{
                        className: '',
                        duration: 1000,
                        style: { 
                            border: '1px solid black',
                            borderRadius: '0'
                            }
                        }} 
                        containerStyle={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                        }}

                    />
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
                        <CartItem 
                            key={cartItem.id} 
                            cartItem={cartItem}
                            itemUpdated={itemUpdated}
                            itemRemoved={itemRemoved}
                             />
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
