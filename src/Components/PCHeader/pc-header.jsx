import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"
import * as RoutesTypes from "../../Constants/routesTypes"
import { SearchBar } from "../";
import "./pc-header.scss";

function PCHeader() {
    const cart = useSelector(obj => obj.cart);
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
                    <img src={process.env.PUBLIC_URL + "/Images/icon.svg"} alt="The company's icon" />
                    <p>My Site's Name</p>
                </div>
            </Link>
            <div className="header-nav">
                <Link to={RoutesTypes.PROFILE}>
                    <div>
                        <img src={process.env.PUBLIC_URL + "/Images/profile-image.svg"} alt="Profile logo" />
                        <p>My Profile</p>
                    </div>
                </Link>
                <Link to={RoutesTypes.CART}>
                    <div className="header-cart">
                        <p>Items</p>
                        <img src={cart.length ? process.env.PUBLIC_URL + "/Images/filled-cart.svg" : process.env.PUBLIC_URL + "/Images/cart.svg"} className="fix-cart" alt="Cart" />
                        <div className="basket-counter">
                            <p>{cart.length}</p>
                        </div>
                    </div>
                </Link>
                <button onClick={() => setIsSearchActivated(prevVal => !prevVal)}>
                    <div className="search-price">
                        <p>{`$${itemsPrice}`}</p>
                        <img src={process.env.PUBLIC_URL + "/Images/search-icon.svg"} alt="Search" />
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

export default PCHeader