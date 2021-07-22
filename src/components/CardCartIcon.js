import { useShoppingCart } from "use-shopping-cart";
import { useContext } from "react";
import { ModalContext } from "../ModalContext"

export default function CardCartIcon(props) {

    let { product } = props
    let { stock, id } = product

    const { addItem, cartDetails } = useShoppingCart()

    const { setIsModalOpen } = useContext(ModalContext)

    const handleAddItem = (product) => () => {
        addItem(product)
    }


    
    function calculateStock() {
        if (cartDetails[id]) {
            return stock - cartDetails[id].quantity
        } else {
            return stock
        }
    }

    return (
        <>
        {calculateStock() > 0 && 
        
            <span 
                className="material-icons card-cart"
                onClick={handleAddItem(product)}
     
                style={{cursor: "pointer"}}
            >
                add_shopping_cart
            </span>
        
        }
        </>
        
    )
}