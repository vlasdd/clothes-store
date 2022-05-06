import React, { useState, useContext } from "react";
import { Context } from "../CartContext"
import { Link } from "react-router-dom";
import * as RoutesTypes from "../constants/routesTypes"

export default function Product({ data }){
    const [isMouseOver, setIsMouseOver] = useState(false)
    const { cartItems, deleteFromCart, addToCart } = useContext(Context)

    function defineButton() {
        if (cartItems.some(elem => elem == data)) {
            return (
                <button onClick={() => deleteFromCart(data)}>
                    <img src="../images/filled-cart.svg" />
                </button>
            )
        }
        return (
            <button onClick={() => addToCart(data)}>
                <img src={isMouseOver ? "../images/cart.svg" : ""} />
            </button>
        )
    }

    return( 
        <div 
            className="single-product"
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <div className="product-image">
                <Link to={`${RoutesTypes.PRODUCT_PAGE}${data.id}`}>
                    <img src={data.image} />
                </Link>
            </div>
            <div className="product-info">
                <Link to={`${RoutesTypes.PRODUCT_PAGE}${data.id}`}>
                    <h1>{data.title}</h1>
                </Link>
                <div className="product-prices">
                    <p>{`$${data.price.toFixed(2)}`}</p>
                    <p><strike>{`$${(data.price * 1.55).toFixed(2)}`}</strike></p>
                    <p>35% Off</p>
                </div>
            </div>
            {data.rating.count < 250 && <div className="hot">
                <p>HOT</p>
            </div>}
            {defineButton()}
        </div>    
    )
}