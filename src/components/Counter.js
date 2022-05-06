import React, { useContext } from "react"
import { Context } from "../CartContext"

export default function Counter({ amount, setAmount, availableItems, data }){
    const { addToCart, deleteFromCart } = useContext(Context)

    return (
        <div className="counter">
            <button onClick={() => {
                if(amount > 0){
                    setAmount(prevAmount => prevAmount - 1)
                    deleteFromCart(data)
                }
            }}>
                <img src="../images/decrement.svg"/>
            </button>
            <p>{amount}</p>
            <button onClick={() => {
                if(amount < availableItems){
                    setAmount(prevAmount => prevAmount + 1)
                    addToCart(data)
                }
            }}>
                <img src="../images/increment.svg"/>
            </button>
        </div>
    )
}