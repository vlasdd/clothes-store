import React from "react";
import "./confirmation.scss";
import { useDispatch } from "react-redux";
import { setIsPageDisabled } from "../../Redux/Actions/disabledActions";

export default function Confirmation({ text, callback }) {
    const dispatch = useDispatch();

    return (
        <div className="confirmation-container col-11 col-md-6 col-lg-5">
            <button 
                onClick={() => dispatch(setIsPageDisabled(false))}
                className="close-button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 question-mark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="h1-black-default">Are you sure you want to {text}?</h1>
            <button
                onClick={async () => {
                    await callback()
                    dispatch(setIsPageDisabled(false))
                }}
                className="check-out-button"
            >
                <h2 className="h2-default">Yes</h2>
            </button>
        </div>
    )
}