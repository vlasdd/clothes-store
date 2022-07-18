import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as RoutesTypes from "../../Constants/routesTypes"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItemsType } from "../../Redux/Actions/cartActions";
import "./product.scss";

export default function Product({ data }){
    const cart = useSelector(obj => obj.cart);
    const [isMouseOver, setIsMouseOver] = useState(false)
    const dispatch = useDispatch();

    function defineButton() {
        console.log()
        if (cart.some(elem => elem.id === data.id)) {
            return (
                <button onClick={() => dispatch(removeItemsType(data))}>
                    <img src={process.env.PUBLIC_URL + "/Images/filled-cart.svg"} alt="Cart"/>
                </button>
            )
        }

        return (
            <button onClick={() => dispatch(addToCart(data))}>
                <img src={isMouseOver ? process.env.PUBLIC_URL + "/Images/cart.svg" : ""}/>
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
                    <img src={data.image} alt="The product's photo"/>
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