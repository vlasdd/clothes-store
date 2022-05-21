import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Counter } from "../../Components";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Redux/Actions/cartActions";
import { motion } from "framer-motion";
import { Review } from "../../Components";
import { getDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { Confirmation } from "../../Components";
import { TextareaModal } from "../../Components";
import { RelatedProducts } from "../../Components";
import "./product-page.scss";
import { setIsPageDisabled } from "../../Redux/Actions/disabledActions";
import { setIsBeingLoaded } from "../../Redux/Actions/isBeingLoadedActions";

export default function ProductPage(){
    const dispatch = useDispatch();
    const cart = useSelector(obj => obj.cart);
    const user = useSelector(obj => obj.currentUser.user)
    const isPageDisabled = useSelector(obj => obj.isPageDisabled);
    const allItems = useSelector(obj => obj.allItems);

    const { id } = useParams();
    const data = allItems[id-1];

    const [amount, setAmount] = useState(amountOfAppears(data))
    const [reviews, setReviews] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentIdToDelete, setCommentIdToDelete] = useState(null);

    useEffect(() => {
        async function getComments(){
            const commentsRef = doc(db, "comments", `comments${id}`);
            const allItemsComments = await getDoc(commentsRef);

            if(!allItemsComments.data()){
                await setDoc(commentsRef, {
                    allComments: []
                })
                return;
            }

            setComments(allItemsComments.data().allComments);
        }

        getComments();
    }, [])

    useEffect(() => {
        if(!isPageDisabled){
            setCommentIdToDelete(null);
        }
    }, [isPageDisabled])

    console.log(commentIdToDelete);

    const date = new Date();

    function amountOfAppears(obj) {
        return cart.reduce((value, elem) => {
            if (elem.id === obj.id) {
                value++;
            }
            return value;
        }, 0)
    }

    async function addComment(text) {
        dispatch(setIsBeingLoaded(true));

        const objToUpdate = {
            text: text,
            profileImage: user.profileImage,
            username: user.username,
            fullName: user.fullName,
            date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`,
            id: nanoid()
        }

        await updateDoc(doc(db, "comments", `comments${id}`), {
            allComments: [...comments, objToUpdate]
        })

        setComments(prevComments => [...prevComments, objToUpdate])

        dispatch(setIsBeingLoaded(false));
    }

    async function deleteComment(productId){
        dispatch(setIsBeingLoaded(true));

        await updateDoc(doc(db, "comments", `comments${id}`), {
            allComments: comments.filter(elem => elem.id !== productId)
        })

        setComments(prevComments => prevComments.filter(elem => elem.id !== productId))

        dispatch(setIsBeingLoaded(false));
    }

    return (
        <motion.div
            className="div-column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {isPageDisabled &&
                (commentIdToDelete ? 
                <Confirmation
                    text="delete your comment"
                    callback={() => deleteComment(commentIdToDelete)}
                /> :
                <TextareaModal 
                    labelText="Write your comment below"
                    buttonText="Publish"
                    callback={addComment}
                />)
            }
            <div className={`item-info-container col-12 col-sm-11 col-md-10 ${isPageDisabled && "disabled-page"}`}>
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
                            className={`add-to-cart counter ${cart.some(item => item.id === data.id) && "disabled-button"}`}
                            disabled={cart.some(item => item.id === data.id)}
                            onClick={() => {
                                setAmount(prevAmount => prevAmount + 1)
                                dispatch(addToCart(data))
                            }}
                        >
                            <img src="../Images/blue-cart.svg" />
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
                            <img src="../Images/facebook.svg"/>
                            <p>Share on Facebook</p>
                        </a>
                        <a 
                            className="share-twitter"
                            href="https://twitter.com/?lang=uk"
                        >
                            <img src="../Images/twitter.svg" />
                            <p>Share on Twitter</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className={`product-information col-12 col-sm-11 col-md-10 ${isPageDisabled && "disabled-page"}`}>
                <div className="title">
                    <button 
                        onClick={() => setCurrentTab(0)}
                        className={currentTab === 0 ? "chosen": "not-chosen"}
                    >
                        <p>Product Information</p>
                    </button>
                    <button 
                        onClick={() => setCurrentTab(1)}
                        className={currentTab === 1 ? "chosen": "not-chosen"}
                    >
                        <p>Reviews</p>
                    </button>
                    {currentTab === 1 &&
                        user.userId &&
                        <button
                            className="add-button"
                            onClick={() => dispatch(setIsPageDisabled(true))}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    }
                </div>
                {currentTab === 0 ?
                    <div className="info">
                        <p>{data.description}</p>
                    </div> :
                    comments.length === 0 ?
                        <div className="info">
                            {user.userId ? 
                                <p>Add your first comment</p>:
                                <p>No comments here yet</p>
                            }
                        </div> :
                        <div className="reviews-container">
                            {comments.map(elem => <Review
                                {...elem}
                                currentUser={user.username}
                                callback={() => {
                                    setCommentIdToDelete(elem.id)
                                    dispatch(setIsPageDisabled(true))
                                }}
                                key={elem.id}
                            />)}
                        </div>
                }
            </div>
            <RelatedProducts
                id={data.id}
                category={data.category}
            />
        </motion.div>
    )
}