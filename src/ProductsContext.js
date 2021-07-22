import { useState, createContext } from 'react'
import axios from 'axios';
import { useQuery } from "react-query";


export const ProductsContext = createContext()


export function ProductsProvider(props) {

    const [allProducts, setAllProducts] = useState([])

    const { data, isLoading } = useQuery("Products", () => axios('/api/products').then((res) => setAllProducts(res.data.products)))


    function collateGenres(allProducts) {
        let resultArr = [];
        allProducts
            .filter(product => product.genre)
            .map(product => product.genre)
            .forEach(array => {
                array.forEach(genre => {
                    if (!resultArr.includes(genre)) {
                        resultArr.push(genre)
                    }
                })
            })
        return resultArr;
    }

    const allGenres = collateGenres(allProducts)

   
    return <ProductsContext.Provider value={{ allProducts, isLoading, allGenres }}>
        {props.children}
    </ProductsContext.Provider>
}