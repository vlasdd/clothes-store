import React, { useContext } from "react";
import { Link } from "react-router-dom"
import { Context } from "../CartContext"
import * as RoutesTypes from "../constants/routesTypes"

export default function Header(){
    const { cartItems } = useContext(Context);

    const itemsPrice = cartItems
        .reduce((price, elem) => {
            price += elem?.price;
            return price;
        }, 0)
        .toFixed(2)

    return (
        <div className="header-container col-12 col-sm-11 col-md-10">
            <Link to={RoutesTypes.MAIN}>
                <div className="header-logo">
                    <img src="../images/icon.svg" />
                    <p>My Site's Name</p>
                </div>
            </Link>
            <div className="header-nav">
                <Link to={RoutesTypes.PROFILE}>
                    <div>
                        <img src="../images/profile-image.svg" />
                        <p>My Profile</p>
                    </div>
                </Link>
                <div className="search-price">
                    <p>{`$${itemsPrice}`}</p>
                    <img src="../images/search-icon.svg" />
                </div>
                <Link to={RoutesTypes.CART}>
                    <div className="header-cart">
                        <p>Items</p>
                        <img src={cartItems.length ? "../images/filled-cart.svg" : "../images/cart.svg"} className="fix-cart"/>
                        <div className="basket-counter">
                            <p>{cartItems.length}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}