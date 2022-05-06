import React, { useContext, useState } from "react";
import CartItem from "../components/CartItem";
import { Context } from "../CartContext"
import Loading from "../components/Loading";

export default function Cart(){
    const { cartItems, setCartItems } = useContext(Context)
    const [isBeingLoaded, setIsBeingLoaded] = useState(true)
    const [isPurchaseDone, setIsPurchaseDone] = useState(false)
    console.log(cartItems);

    const uniqueCartItems = [...new Set(cartItems)];
    const cartBlocks = uniqueCartItems.map(elem => {
        return <CartItem
            key={elem.id}
            data={elem}
        />
    })

    const finalPice = cartItems
    .reduce((price, elem) => {
        price += elem?.price;
        return price;
    }, 0)
    .toFixed(2)

    return (
        !isBeingLoaded ?
            <Loading /> :
            !cartItems.length ?
                <div className="special-message col-10">
                    {isPurchaseDone ? 
                        <p className="special-message-done">Thank you!</p>:
                        <p>You have not added anything to cart yet</p>}
                </div> :
                <>
                    <div className="grey-area"></div>
                    <div className="cart-container col-12 col-sm-11 col-md-10">
                        <div className="cart-bar">
                            <p>PRODUCT</p>
                            <div className="bar-extra-text">
                                <p>PRICE</p>
                                <p>QTY</p>
                                <p>UNIT PRICE</p>
                            </div>
                        </div>
                        {cartBlocks}
                    </div>
                    <div className="check-out-container col-12 col-sm-11 col-md-10">
                        <div className="check-out">
                            <div className="check-out-text check-out-p">
                                <p>Subtotal</p>
                                <p>${finalPice}</p>
                            </div>
                            <div className="check-out-text check-out-p">
                                <p>Shipping fee</p>
                                <p>No</p>
                            </div>
                            <div className="check-out-text check-out-p">
                                <p>Coupon</p>
                                <p>No</p>
                            </div>
                            <div className="check-out-text check-out-p">
                                <p>TOTAL</p>
                                <p>${finalPice}</p>
                            </div>
                            <button
                                className="check-out-button"
                                onClick={() => {
                                    setIsBeingLoaded(false)
                                    setCartItems([])
                                    setIsPurchaseDone(true)
                                    setTimeout(() => setIsBeingLoaded(true), 3000)
                                }}
                            >
                                <h2 className="h2-default">Check out</h2>
                            </button>
                        </div>
                    </div>
                </>
    )
}