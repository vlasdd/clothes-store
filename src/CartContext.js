import React, { useState, useEffect, createContext } from "react";

const Context = createContext();

function ContextProvider({ children }){
    const [allItems, setAllItems] = useState([])
    const [cartItems, setCartItems] = useState([]) 
    const [isBeingLoaded, setIsBeingLoaded] = useState(false);

    useEffect(() => {
        async function fetchData() {
            let res = await fetch("https://fakestoreapi.com/products")
            res = await res.json()
            setAllItems(res)
        }

        fetchData();
    }, [])

    function addToCart(obj){
        setCartItems(prevItems => [...prevItems, obj])
    }

    function amountOfAppears(obj){
        return cartItems.reduce((value, elem) => {
            if(elem.id == obj.id){
                value++;
            }
            return value;
        }, 0)
    }

    function deleteFromCart(obj){
        let countOfAppears = amountOfAppears(obj);
        setCartItems(prevItems => prevItems.reduce((arr, elem) => {
            if(elem.id != obj.id){
                arr.push(elem);
            }
            else if(elem.id == obj.id && countOfAppears > 1){
                arr.push(elem);
                countOfAppears--;
            }
            return arr;
        }, []))
    }

    return(
        <Context.Provider value={{
            allItems,
            cartItems,
            addToCart,
            deleteFromCart,
            setCartItems,
            amountOfAppears,
            isBeingLoaded,
            setIsBeingLoaded,
        }}>
            {children}
        </Context.Provider>
    )

}

export {ContextProvider, Context}