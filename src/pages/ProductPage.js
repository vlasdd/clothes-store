import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../CartContext"
import Counter from "../components/Counter";
import Product from "../components/Product";
import { nanoid } from "nanoid";

export default function ProductPage(){
    const { id } = useParams()
    const { allItems, addToCart, cartItems, amountOfAppears } = useContext(Context)
    const data = allItems[id-1];
    const [amount, setAmount] = useState(amountOfAppears(data))
    const [reviews, setReviews] = useState(0);
    
    const relatedProducts = allItems
        .reduce((arr, elem) => {
            if (elem.category == data.category && elem.id != data.id) {
                arr.push(elem);
            }
            return arr
        }, [])
        .slice(0, 4)
        .map(elem =>
            <Product
                key={nanoid()}
                data={elem}
            />
        )

    return(
        <>
            <div className="item-info-container col-12 col-sm-11 col-md-10">
                <div className="item-info-image product-image">
                    <img src={data.image} />
                </div>
                <div className="item-info-data">
                    <div className="item-info-title">
                        <h1>{data.title}</h1>
                        <div className="item-info-review">
                            <p className="review-counter">{reviews} reviews</p>
                            <button
                                onClick={() => setTimeout(() => {
                                    setReviews(prevVal => prevVal + 1)
                                }, 2000)}
                            ><p>Submit a review</p></button>
                        </div>
                    </div>
                    <div className="product-prices">
                        <p>{`$${data.price.toFixed(2)}`}</p>
                        <p><strike>{`$${(data.price * 1.55).toFixed(2)}`}</strike></p>
                        <p>35% Off</p>
                    </div>
                    <div className="item-extra-info">
                        <p>Availability:</p>
                        <p>{data.rating.count ? "In stock" : "Unavailable"}</p>
                        <p>Category:</p>
                        <p>{data.category[0].toUpperCase() + data.category.slice(1, data.category.length)}</p>
                        <p>Free shipping</p>
                    </div>
                    <div className="item-data-counter">
                        <button 
                            className="add-to-cart counter"
                            onClick={() => {
                                if(!cartItems.includes(data)){
                                    setAmount(prevAmount => prevAmount + 1)
                                    addToCart(data)
                                }
                            }}
                        >
                            <img src="../images/blue-cart.svg"/>
                            <p>Add To Cart</p>
                        </button>
                        <Counter
                            amount={amount}
                            setAmount={setAmount}
                            availableItems={data.rating.count}
                            data={data}
                        />
                    </div>
                    <div className="share-container">
                        <a 
                            className="share-facebook"
                            href="https://uk-ua.facebook.com/"
                        >
                            <img src="../images/facebook.svg"/>
                            <p>Share on Facebook</p>
                        </a>
                        <a 
                            className="share-twitter"
                            href="https://twitter.com/?lang=uk"
                        >
                            <img src="../images/twitter.svg" />
                            <p>Share on Twitter</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="product-information col-12 col-sm-11 col-md-10">
                <div className="title">
                    <p>Product Information</p>
                </div>
                <div className="info">
                    <p>{data.description}</p>
                </div>
            </div>
            <div className="products-container">
                <h1 className="h1-black-default">RELATED PRODUCTS</h1>
                <div className="products-items-4 products-items col-11 col-sm-11 col-md-10">
                    {relatedProducts}
                </div>
            </div>
        </>
    )
}