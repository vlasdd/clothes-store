import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import * as RoutesTypes from "../../Constants/routesTypes"
import { SearchBar } from "../";
import "./header.scss"

export default function Header(){
    const cart = useSelector(obj => obj.cart);
    const user = useSelector(obj => obj.currentUser.user);
    const allItems = useSelector(obj => obj.allItems);
    const isPageDisabled = useSelector(obj => obj.isPageDisabled);
    const location = useLocation();
    const [isSearchActivated, setIsSearchActivated] = useState(false);

    useEffect(() => {
        setIsSearchActivated(false);
    }, [location.pathname])

    const itemsPrice = useMemo(() => cart
        .reduce((price, elem) => {
            price += elem?.price;
            return price;
        }, 0)
        .toFixed(2),
        [cart]
    )

    return (
        <div className={`header-container col-12 col-sm-11 col-md-10 ${isPageDisabled && "disabled-page"}`}>
            <Link to={RoutesTypes.MAIN}>
                <div className="header-logo">
                    <img src="../Images/icon.svg" />
                    <p>My Site's Name</p>
                </div>
            </Link>
            <div className="header-nav">
                <Link to={RoutesTypes.PROFILE}>
                    <div>
                        <img src="../Images/profile-image.svg" />
                        <p>My Profile</p>
                    </div>
                </Link>
                <Link to={RoutesTypes.CART}>
                    <div className="header-cart">
                        <p>Items</p>
                        <img src={cart.length ? "../Images/filled-cart.svg" : "../Images/cart.svg"} className="fix-cart" />
                        <div className="basket-counter">
                            <p>{cart.length}</p>
                        </div>
                    </div>
                </Link>
                <button onClick={() => setIsSearchActivated(prevVal => !prevVal)}>
                    <div className="search-price">
                        <p>{`$${itemsPrice}`}</p>
                        <img src="../Images/search-icon.svg" />
                    </div>
                </button>
                {isSearchActivated &&
                    <div className="search-wrapper">
                        <SearchBar
                            placeholder="Enter a product name"
                            data={allItems}
                        />
                    </div>}
            </div>
        </div>
    )
}