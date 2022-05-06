import React, { useContext } from "react";
import { Context } from "../CartContext"
import Product from "../components/Product"
import { nanoid } from "nanoid"

export default function ItemsPage(){
    const { allItems } = useContext(Context)
    const products = allItems
    .map(
        elem => <Product
            kay={nanoid()}
            data={elem}
        />
    )

    return (
        <>
            <div className="items-page-container col-11">
                <div className="gap">
                    <div className="addidas-sneakers">
                        <div className="addidas-text">
                            <h1 className="h1-default">Adidas Men Running Sneakers</h1>
                            <h2 className="h2-default">Performance and design. Taken right to the edge.</h2>
                        </div>
                        <img src="../images/extra-shoes.svg" />
                    </div>
                    <div className="items-page-grid">
                        {products}
                    </div>
                </div>
            </div>
        </>
    )
}