import axios from "axios";
import { useShoppingCart } from "use-shopping-cart";

export default function useCheckout() {
    const { redirectToCheckout, cartDetails } = useShoppingCart()

    async function handleCheckout() {
        const session = await axios
            .post('/api/checkout-sessions', cartDetails)
            .then((res) => res.data)
            .catch((error) => {
                console.log("Error During Checkout", error);
            })
        
            if (session) {
                console.log(session);
                redirectToCheckout({ sessionId: session.id })
            }
    }
    return handleCheckout

}