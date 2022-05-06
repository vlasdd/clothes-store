import React, { useState, useContext } from "react";
import Counter from "./Counter"
import { Context } from "../CartContext"
import { Link } from "react-router-dom"
import * as RoutesTypes from "../constants/routesTypes"

export default function CartItem({ data }){
    const { amountOfAppears, setCartItems } = useContext(Context)
    const [amount, setAmount] = useState(amountOfAppears(data))

    return(
        <div className="single-item-container">
            <div className="item-images-container">
                <button onClick={() => {
                    setCartItems(prevItems => prevItems.filter(elem => elem.id != data.id))
                }}>
                    <img src="../images/delete-icon.svg" />
                </button>
                <Link to={`${RoutesTypes.PRODUCT_PAGE}${data.id}`}>
                    <img src={data.image} className="item-image" />
                </Link>
                <p>{data.title}</p>
            </div>
            <div className="single-item-rest">
                <p>{`$${(data.price*amount).toFixed(2)}`}</p>
                <Counter
                    amount={amount}
                    setAmount={setAmount}
                    availableItems={data.rating.count}
                    data={data}
                />
                <p>{`$${data.price.toFixed(2)}`}</p>
            </div>
        </div>
    )
} 