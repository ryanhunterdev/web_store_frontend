import { Link } from 'react-router-dom'
import CartSummary from './CartSummary'
import './Navbar.css'

 
const Navbar = () => {


    return ( 
        <header>
                <h1 className="nav-header">
                    <Link to="/shop" style={{fontWeight: 600}}>rekkids n merch</Link>
                </h1>
            
                <div className="nav-checkout">
                    <CartSummary />
                </div>
        </header>
    );
}
 
export default Navbar;