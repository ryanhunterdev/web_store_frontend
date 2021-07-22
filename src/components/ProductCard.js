import './ProductCard.css'
import { Link } from 'react-router-dom'
import ProductStock from './ProductStock'
import formatCurrencyString from '../utility/formatProductPrice'
import "@fontsource/material-icons";
import CardCartIcon from './CardCartIcon'


export default function ProductCard(props) {

    

    const { product } = props;
    const { 
        image, 
        artist, 
        name, 
        type, 
        stock
 
    } = product;

    const urlLink = '/shop/' + name.replaceAll(" ", "-")

    let price = formatCurrencyString(product)

    return (
        <div className="product-card">

            <Link to={urlLink}>
                <img src={image} alt="" className="product-card-img" />
            </Link>
    
          
   
            <div className="product-card-bottom">
                <div className="product-card-bottom-left">
                    <Link to={urlLink}>
                        <h2 className="product-artist">
                        {artist ? artist : ""}
                        </h2>
                    </Link>
                    <Link to={urlLink}>
                        <h3 className="product-title"> { name } </h3>
                    </Link>
                    <p className="product-card-type">
                            Type: { type }
                    </p> 
                    <ProductStock stock={stock}/>
                </div>

                <div className="product-card-bottom-right">
                    <CardCartIcon product={product}/>
                    <p className="product-card-price">
                        { price }
                    </p>
                </div>
            </div>
        </div>
    )
    
}