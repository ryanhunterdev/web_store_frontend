
const ProductStock = (props) => {
    const stock = props.stock
    return  <p className={"product-card-stock"}
    style={stock ? { color: 'inherit'} : {color: 'red'
        }}
    >
    {stock ? 'In Stock' : 'Sold Out'}
    </p> 
}

export default ProductStock;