import React from "react"
import { useDispatch } from "react-redux"
import { addToCart, removeSingleItem } from "../../Redux/Actions/cartActions";
import "./counter.scss"

export default function Counter({ amount, setAmount, availableItems, data }){
    const dispatch = useDispatch();

    return (
        <div className="counter">
            <button onClick={() => {
                if(amount > 0){
                    setAmount(prevAmount => prevAmount - 1)
                    dispatch(removeSingleItem(data));
                }
            }}>
                <img src="../Images/decrement.svg" alt="Increment"/>
            </button>
            <p>{amount}</p>
            <button onClick={() => {
                if(amount < availableItems){
                    setAmount(prevAmount => prevAmount + 1)
                    dispatch(addToCart(data));
                }
            }}>
                <img src="../Images/increment.svg" alt="Decrement"/>
            </button>
        </div>
    )
}