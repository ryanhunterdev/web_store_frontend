import formatProductPrice from "../utility/formatProductPrice";
import { useShoppingCart } from "use-shopping-cart"
import "@fontsource/material-icons";

import "./CartItem.css"

export default function CartItem({cartItem}) {

  const { removeItem, incrementItem, decrementItem } = useShoppingCart()

  console.log(cartItem);

  const { image, name, stock, quantity, id, formattedValue } = cartItem

  const price = formatProductPrice(cartItem)
  
    return (
        <div className="cart-item">
          <div className="cart-img-container">
            <img src={image} alt={name} className="cart-img" />
          </div>
          <div className="cart-item-info">
            <div className="cart-item-info-top">
              <div className="info-top-left">
                <h3 className="cart-item-name">
                  {name}
                </h3>
                <p className="cart-item-price">
                  {price} x {quantity}
                </p>

              </div>
              <div className="info-top-right">
                <div 
                  className="remove-item"
                  onClick={() => removeItem(id)}
                  >
                    <span className="material-icons">
                    delete
                    </span>
                  </div>
              </div>
            </div>
           
            <div className="cart-item-bottom">
              <div className="cart-item-quantity">
                <button 
                  className="cart-quantity-button"
                  onClick={() => decrementItem(id)}>
                  -
                </button>
                <div className="cart-quantity">
                  {quantity}
                </div>
                <button 
                  className="cart-quantity-button"
                  onClick={() => incrementItem(id)}
                  disabled={quantity >= stock}
                  >
                  +
                </button>
              </div>
              <div>
                <p className="item-total">{formattedValue.slice(1)}</p>
              </div>
            </div>
            
          </div>
        </div>
    )
}