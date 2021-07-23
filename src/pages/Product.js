import { useParams } from "react-router-dom"
import axios from 'axios';
import { useQuery } from "react-query";
import './Product.css'
import ProductStock from "../components/ProductStock"
import { useShoppingCart } from "use-shopping-cart";
import formatCurrencyString from '../utility/formatProductPrice.js'
import { useState, useEffect } from 'react';
import ProductsGrid from '../components/ProductsGrid';
import { ProductsContext } from "../ProductsContext"
import { useContext } from "react";
import { ModalContext } from "../ModalContext"

    
export default function Product () {

    const { addItem, cartDetails } = useShoppingCart();

    const { allProducts } = useContext(ProductsContext)

    const [addQuantity, setAddQuantity] = useState(1)

    const [isLargeImageUp, setisLargeImageUp] = useState(false)

    const { setIsModalOpen } = useContext(ModalContext)

    const handleIncrement = () => {
        
        setAddQuantity(addQuantity + 1)
    }
    const handleDecrement = () => {
        addQuantity > 1 && setAddQuantity(addQuantity - 1)
    }
    
    const toggleLargeImage = () => {setisLargeImageUp(!isLargeImageUp)}

    let { item: urlName } = useParams()

    useEffect(() => document.title = `${urlName.replaceAll("-", " ")} - rekkids n merch`)

    const { data: product, isLoading, isError, error } = useQuery(["Product", urlName], () => axios(`/api/products/${urlName}`).then((res) => res.data.product))

    if (isLoading) return <div><h1>LOADING...</h1></div>
    if (isError) return <div >{ error.message }</div>

    const { 
        image, 
        name, 
        year, 
        condition,
        artist, 
        stock, 
        description,
        category,
        genre,
        id
    } = product
  
    const isMusic = category === 'Music' ? true : false;

    const similarItems = (allProducts) => {
        return allProducts.filter(product => product.category === category && product.id !== id)
    }
    
    const price = formatCurrencyString(product)

    function calculateStock() {
        if (cartDetails[id]) {
            return stock - cartDetails[id].quantity
        } else {
            return stock
        }
    }

    function handleAddItem() { 
        addItem(product, { count: Number(addQuantity) });
        setTimeout(() => setIsModalOpen(true), 100)
        setAddQuantity(1)
    }

    const buttonMessage = () => {
        if (!stock) {
            return "Out Of Stock"
        } else if (!calculateStock()) {
            return "Max Added"
        } else {
            return "Add To Cart"
        } 
    }

    return ( 
        <div className="product-page"> 
        {isLargeImageUp && 
            <div className="image-large-overlay" onClick ={toggleLargeImage}>
                <div className="image-large-modal">
                    <p onClick ={toggleLargeImage}>x</p>
                    <img src={image} alt={name} className="large-img" />
                </div>
            </div>       
        }
        <h1 style={{
                fontSize: "2.5em",
                fontWeight: "600",
                fontStyle: "italic",
                paddingBottom: ".5em"
            
            }}>{name}</h1>
        <div className="product-wrapper">
            <div className="product-left">
                <img 
                    src={image} 
                    alt={name} 
                    className="product-img" 
                    onClick ={toggleLargeImage}
                    />
                { isMusic && 
                    <div className="product-year-condition">
                        <p className="product-info"><span>Year:</span>
                        { year }</p>
                        <p className="product-info"><span>Condition:</span>{ condition }</p>
                    </div>
                }
            </div>
            <div className="product-right">
                <h3 className="product-artist">
                    { artist }
                </h3>
                <div className="product-stock">
                   {stock > 0 ?? stock} <ProductStock stock={ stock }/> 
                </div>
                <div className="incrementer-and-button">
                { calculateStock() > 0 && 
                    <div className="cart-item-quantity">
                        <button 
                        className="cart-quantity-button"
                        onClick={handleDecrement}
                        >
                        -
                        </button>
                        <div className="cart-quantity">
                        <input 
                            type="number"
                            value={addQuantity} 
                            
                            min={1}
                            max={calculateStock()}
                            className="product-quantity"
                        />
                        </div>
                        <button 
                        className="cart-quantity-button"
                        onClick={handleIncrement}
                        disabled={addQuantity >= calculateStock()}
                        >
                        +
                        </button>
                    </div>          
                }
                <button 
                    className="product-big-cart-button"
                    disabled={!calculateStock()}
                    onClick={handleAddItem}
                >
                {stock > 0 && <p>${Number(price.slice(2)) * addQuantity}
                </p>}    
                {buttonMessage()}
                </button>

                </div>

                <div className="product-description">
                    <p className="product-description">
                        { description }
                    </p>
                    {/* { isMusic && 
                        <button className="product-play">
                            play
                        </button>
                    } */}
                </div>
                { isMusic && 
                    <div className="genres">
                        <span style={{textDecoration: "underline"}}>Genres:</span> 
                    {
                        genre.map(genre => 
                        <p style={{ display: 'inline'}}className="genre-link" key={ genre }>{ genre }</p>
                    )
                    }
                    </div>
                }
            </div>
        </div>

            <div className="similar-items">
                <h3 style={{ fontWeight: '500'}}>Similar items:</h3>
                <ProductsGrid products={similarItems(allProducts)}/>
            </div>
        </div>

        
     );
}
 