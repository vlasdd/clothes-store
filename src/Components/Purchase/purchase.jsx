import React from "react"
import { Link } from "react-router-dom";
import * as RoutesTypes from "../../Constants/routesTypes"
import { nanoid } from "nanoid"
import "./purchase.scss"

export default function Purchase({ purchase }) {
    const { name, amount, date, price, id } = purchase;

    return (
        <div className="purchase-container col-12 col-sm-11 col-md-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mail" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div className="info-container">
                <div className="name-amount">
                    <Link to={`${RoutesTypes.PRODUCT_PAGE}${id}`}>
                        <p className="purchase-name">{name}</p>
                    </Link>
                    <p className="info">({amount})</p>
                </div>
                <p>Total price: <i className="red">{price.toFixed(2)}$</i></p>
                <p>Id/Date: <i className="info">{id}{nanoid()} / {date}</i></p>
            </div>
        </div>
    )
}