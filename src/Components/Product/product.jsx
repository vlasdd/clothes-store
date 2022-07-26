import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as RoutesTypes from "../../Constants/routesTypes"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeItemsType } from "../../Redux/Actions/cartActions";
import "./product.scss";
import useWindowWidth from "../../Helpers/useWindowWidth";

export default function Product({ data }){
    const cart = useSelector(obj => obj.cart);
    const [isMouseOver, setIsMouseOver] = useState(false)
    const dispatch = useDispatch();
    const width = useWindowWidth();

    function defineButton() {
        if (cart.some(elem => elem.id === data.id) && width > 730) {
            return (
                <button onClick={() => dispatch(removeItemsType(data))}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                </button>
            )
        }

        if(isMouseOver && width > 730){
            return (
                <button onClick={() => dispatch(addToCart(data))}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </button>
            )
        }
    }

    return ( 
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