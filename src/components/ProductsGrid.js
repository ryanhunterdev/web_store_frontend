import './ProductsGrid.css'

import ProductCard from './ProductCard'

const ProductsGrid = (props) => {
    const { products, isLoading } = props;

    if (isLoading) return <div><h1>LOADING...</h1></div>
 
    return ( 
        <div className="products-grid">
            {products.map((product) => {

                return <ProductCard product={product} key={product.id}/>
            }
            )}
        </div> 

    );
}
 
export default ProductsGrid;