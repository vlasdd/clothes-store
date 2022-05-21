import React, { useMemo, useState } from "react";
import { CartItem } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../Redux/Actions/cartActions";
import { useNavigate } from "react-router-dom";
import * as RoutesTypes from "../../Constants/routesTypes";
import { addPurchase } from "../../Redux/Actions/userActions";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { motion } from "framer-motion";
import "./cart.scss";
import { setIsBeingLoaded } from "../../Redux/Actions/isBeingLoadedActions";
import { setShouldUserLogin } from "../../Redux/Actions/shouldUserLoginActions";

export default function Cart(){
    const dispatch = useDispatch();
    const cart = useSelector(obj => obj.cart);
    const user = useSelector(obj => obj.currentUser.user)

    const navigate = useNavigate();

    const [isPurchaseDone, setIsPurchaseDone] = useState(false)

    const uniqueCartItems = useMemo(() => cart
        .reduce((accum, elem) => {
            if (accum.every(item => item.id !== elem.id)) {
                accum.push(elem);
            }
            return accum;
        }, []),
        [cart]
    );

    const cartBlocks = useMemo(() => uniqueCartItems
        .map(elem => <CartItem
            key={elem.id}
            data={elem}
        />),
        [uniqueCartItems]
    )

    const finalPice = useMemo(() => cart
        .reduce((price, elem) => {
            price += elem?.price;
            return price;
        }, 0)
        .toFixed(2),
        [cart]
    )

    async function handleCheckOut() {
        if (user.userId === "") {
            dispatch(setShouldUserLogin(true));
            navigate(RoutesTypes.LOGIN);
            return;
        }

        dispatch(setIsBeingLoaded(true));

        const date = new Date();

        const newCartItems = uniqueCartItems.map(elem => {
            const itemAmount = cart.reduce((counter, item) => {
                if (elem.id === item.id) {
                    counter++;
                }
                return counter;
            }, 0)

            console.log(elem);

            const itemToUpdate = {
                name: elem.title,
                amount: itemAmount,
                price: elem.price,
                date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
                image: elem.image,
                id: elem.id
            }

            dispatch(addPurchase(itemToUpdate))

            return itemToUpdate;
        })

        await updateDoc(doc(db, "users", user.userId), {
            purchasesList: [...user.purchasesList, ...newCartItems]
        })

        dispatch(clearCart())
        setIsPurchaseDone(true)
        setTimeout(() => dispatch(setIsBeingLoaded(false)), 1000)
    }

    return (
        <motion.div
            className="div-column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {!cart.length ?
                <div className="special-message col-10">
                    {isPurchaseDone ?
                        <p className="special-message-done">Thank you!</p> :
                        <p>Your cart is empty</p>}
                </div> :
                <div className="div-column">
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
                                onClick={handleCheckOut}
                            >
                                <h2 className="h2-default">Check out</h2>
                            </button>
                        </div>
                    </div>
                </div>}
        </motion.div>
    )
}