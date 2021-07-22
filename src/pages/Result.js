import axios from "axios";

import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"
 

function useQueryString() {
    return new URLSearchParams(useLocation().search)
}


const Result = () => {
    const { clearCart, cartCount } = useShoppingCart();

    

    const queryString = useQueryString()
    const sessionId = queryString.get('session_id')
    
    const { data, isLoading, isError } = useQuery('Result', () => sessionId ? axios(`/api/checkout-sessions/${sessionId}`).then(res => res.data) : null)

    if (data && cartCount > 0) {
        clearCart()
    }

    if (isLoading) return <div>Loading...</div>
    if (!data && !isLoading) return <div>No purchase found.</div>
    if (isError) return <div>Error loading result page</div>
 

    const total = formatCurrencyString({
        value: data.amount_total,
        currency: data.currency,
        language: navigator.language
    })

    return ( 
        <div>
            <h2>Thanks for your purchase! Your order is being processed.</h2>
            <p>Total: { total }</p>
            <p>Email: { data.customer_details.email }</p>
        </div>
     );
}
 
export default Result;