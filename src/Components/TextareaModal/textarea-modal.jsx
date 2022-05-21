import React, { useState } from "react";
import "./textarea-modal.scss"
import { useDispatch } from "react-redux";
import { setIsPageDisabled } from "../../Redux/Actions/disabledActions";

export default function TextareaModal({ labelText, callback, buttonText }) {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState("");

    return (
        <div className="textarea-modal-container col-11 col-md-6 col-lg-5">
            <button 
                onClick={() => dispatch(setIsPageDisabled(false))}
                className="close-button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 question-mark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <h1 className="h1-black-default">{labelText}</h1>
            <textarea
                onChange={(event) => setCommentText(event.target.value)}
            />
            <button
                onClick={async () => {
                    await callback(commentText)
                    dispatch(setIsPageDisabled(false))
                }}
                className="check-out-button"
            >
                <h2 className="h2-default">{buttonText}</h2>
            </button>
        </div>
    )
}