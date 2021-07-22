import "@fontsource/material-icons";
import { useShoppingCart } from "use-shopping-cart";
import { useContext } from "react";
import { ModalContext } from "../ModalContext"

export default function CartSummary() {
    const { cartCount, formattedTotalPrice } = useShoppingCart();
    
    const { toggleCartModal } = useContext(ModalContext)

    return (
        <>
            <div 
            className="nav-cart"
            onClick={toggleCartModal}
            style={{cursor: "pointer"}}
            >
                <div className="cart-amount-container">
                    <p className="cart-total">
                        { formattedTotalPrice }
                    </p>
                    <span className="material-icons">
                        shopping_cart
                    </span>
                    <p className="cart-amount">
                        ({ cartCount })
                    </p>
                </div>
            </div>
        </>
    )
}

