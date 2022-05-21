import React, { useState, useEffect } from "react";
import { Product } from "../";
import { nanoid } from "nanoid"
import "./products-set.scss";
import { useSelector } from "react-redux";

export default function ProductsSet(){
    const [allShownItems, setAllShownItems] = useState([])
    const [currentCategory, setCurrentCategory] = useState("all")
    const allItems = useSelector(obj => obj.allItems);

    useEffect(() => {
        setAllShownItems(allItems)
    }, [])

    function divideByCategories(text){
        setCurrentCategory(text.toLowerCase())
        if(text != "All"){
            setAllShownItems(allItems.filter(elem => elem.category == text.toLowerCase()))
        }
        else{
            setAllShownItems(allItems)
        }
    }

    const categoriesButtons = allItems
        .reduce((typesArray, elem) => {
            if (!typesArray.includes(elem.category)) {
                typesArray.push(elem.category)
            }
            return typesArray
        }, [])
        .map(elem => <button
            key={nanoid()}
            onClick={(event) => divideByCategories(event.target.innerHTML)}
            className={elem == currentCategory ? "chosen" : "not-chosen"}
        >{elem[0].toUpperCase() + elem.slice(1, elem.length)}
        </button>
        )


    const products = allShownItems
        .slice(0, 8)
        .map(elem => {
            return (
                <Product
                    key={nanoid()}
                    data={elem}
                />
            )
        })

    return(
        <div className="products-container">
            <h1 className="h1-black-default">OUR PRODUCTS</h1>
            <div className="products-bar col-10 col-sm-11 col-md-8 col-lg-5">
                <button 
                    className={currentCategory == "all" ? "chosen" : "not-chosen"}
                    onClick={(event) => divideByCategories(event.target.innerHTML)}
                >All</button>
                {categoriesButtons}
            </div>
            <div className={`${products.length > 4 ?
                products.length > 6 ?
                    "products-items-8" :
                    "products-items-6" :
                    "products-items-4"
                } 
                products-items col-11 col-sm-11 col-md-10`}>
                {products}
            </div>
        </div>
    )
}