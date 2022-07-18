import React, { useState } from "react";
import { Counter } from "../";
import { Link } from "react-router-dom"
import * as RoutesTypes from "../../Constants/routesTypes"
import { useDispatch, useSelector } from "react-redux";
import { removeItemsType } from "../../Redux/Actions/cartActions"
import "./cart-item.scss"

export default function CartItem({ data }){
    const dispatch = useDispatch();
    const cart = useSelector(obj => obj.cart);
    const [amount, setAmount] = useState(amountOfAppears(data))

    function amountOfAppears(obj){
        return cart.reduce((value, elem) => {
            if(elem.id == obj.id){
                value++;
            }
            return value;
        }, 0)
    }

    return(
        <div className="single-item-container">
            <div className="item-images-container">
                <button onClick={() => {
                    dispatch(removeItemsType(data))
                }}>
                    <img src={process.env.PUBLIC_URL + "/Images/delete-icon.svg"} alt="Delete icon"/>
                </button>
                <Link to={`${RoutesTypes.PRODUCT_PAGE}${data.id}`}>
                    <img src={data.image} className="item-image" alt="The item's photo"/>
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