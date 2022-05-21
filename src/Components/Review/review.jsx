import React, { useState } from 'react'
import "./review.scss"

export default function Review({ date, username, fullName, profileImage, text, callback, currentUser }) {
    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <div 
            className="review-container"
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <div className="review-image">
                <img src={profileImage} />
            </div>
            <div className="info-container">
                <div className="user-full-name">
                    <div className="full-name-button">
                        <p>{fullName}</p>
                        {username === currentUser &&
                            isMouseOver &&
                            <button onClick={callback}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        }
                    </div>
                    <p><i className="info">@{username}</i></p>
                </div>
                <p>{text}</p>
                <p className="date"><i className="info">{date}</i></p>
            </div>
        </div>
    )
}