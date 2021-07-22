import { useState } from 'react'
import { ProductsContext } from "../ProductsContext"
import { useContext, useEffect } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Flex, 
    Spacer 
} from "@chakra-ui/react"


import './Shop.css'

import ProductsGrid from '../components/ProductsGrid';


export default function Shop() {

    const { allProducts, isLoading, allGenres } = useContext(ProductsContext)

    let [displayedProducts, setDisplayedProducts] = useState(allProducts)


    let [ isMusic, setIsMusic ] = useState(false)

    let [ currentCategory, setCurrentCategory ] = useState("All")

    let [ currentSort, setCurrentSort ] = useState("Latest")
    
    let [ currentGenre, setCurrentGenre ] = useState("Genre")

    useEffect(() => {
        handleCategoryChange(currentCategory)
    }, [currentCategory])

    useEffect(() => {
        handleSort(currentSort)
    }, [currentSort])

    useEffect(() => {
        handleGenreChange(currentGenre)
    }, [currentGenre])

    useEffect(() => document.title = 'shop - rekkids n merch')

    if (isLoading) return <div><h1>LOADING...</h1></div>

    function handleCategoryChange(value) {

        if (value === "Music") {
            setIsMusic(true)
        } else {
            setIsMusic(false)
        }
        if (value === 'All') {
            setDisplayedProducts(allProducts) 
        } else {
            console.log(value);
            setDisplayedProducts(
                allProducts.filter(product => 
                    product.category === value
                )
            )
        }
    }

    function handleGenreChange() {
        if (currentGenre === 'all') {
            handleCategoryChange("Music")
        } else {

            setDisplayedProducts(
                allProducts.filter(product => product.category === "Music" && product.genre.includes(currentGenre))
            )
        }
    }
    
    function handleSort(value) {

        if (value === "Lowest") {
            setDisplayedProducts(
                displayedProducts.slice().sort((a, b) => a.price - b.price)
                
            )
        } else if (value === "Highest") {
            setDisplayedProducts(
                displayedProducts.slice().sort((a, b) => b.price - a.price)
            )
        } else {
            setDisplayedProducts(
                displayedProducts.slice().sort((a, b) => a.id - b.id)
            )
        }
    }



    function updateState() {
        setDisplayedProducts(displayedProducts.length ? displayedProducts.slice() : allProducts)
    }


    return (   
        <div className="shop-wrapper">

            <h1 style={{
                fontSize: "2.5em",
                fontWeight: "600",
                fontStyle: "italic",
                paddingBottom: ".5em"
            
            }}>Shop</h1>
        
            <Flex paddingBottom="1em" width="350px">
                <p>Sort By:</p>
                <Spacer />
                    <Menu>
                        <MenuButton
                            _hover={{
                                textDecoration: "underline"
                            }}
                        >{currentCategory}</MenuButton>
                        <MenuList>
                            <MenuItem 
                                onClick={() => setCurrentCategory("Music")
                                
                                }
                            >
                                Music
                            </MenuItem>
                            <MenuItem 
                                onClick={() => setCurrentCategory("Merch")}
                            >
                                Merch
                            </MenuItem>
                            <MenuItem 
                                onClick={() => setCurrentCategory("All")}
                            >
                                All
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Spacer />
                    <Menu>
                        <MenuButton 
                            onClick={updateState}
                            _hover={{
                                textDecoration: "underline"
                            }}
                            >
                            {currentSort}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => setCurrentSort("Highest")}>
                                Price: Highest
                            </MenuItem>
                            <MenuItem onClick={() => setCurrentSort("Lowest")}>
                                Price: Lowest
                            </MenuItem>
                            <MenuItem onClick={() => setCurrentSort("Latest")}>
                                Latest
                            </MenuItem>
                        </MenuList>
                    </Menu>
                    <Spacer />
                    {isMusic && 
                        
                        <Menu>
                            <MenuButton _hover={{
                                textDecoration: "underline"
                            }}>
                                {currentGenre}
                            </MenuButton>
                            <MenuList>
                            {allGenres.map(genre => (
                                <MenuItem onClick={() => setCurrentGenre(genre)} key={genre}>
                                    {genre}
                                </MenuItem>                       
                            ))}
                            <MenuItem onClick={() => setCurrentGenre('all')}>
                                all
                            </MenuItem>
                            </MenuList>
                        </Menu>
                    }
                </Flex>
            <ProductsGrid 
                products={ displayedProducts.length ? displayedProducts : allProducts }
                isLoading={ isLoading }        
            />
        </div> 
    );
}
 