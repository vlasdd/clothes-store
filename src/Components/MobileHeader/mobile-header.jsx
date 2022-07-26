import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as RoutesTypes from "../../Constants/routesTypes"
import "./mobile-header.scss";

function MobileHeader() {
    const navigate = useNavigate();
    const [isPageOpened, setIsPageOpened] = useState(false);

    return (
        <>
            <div className="mobile-header">
                <button onClick={() => setIsPageOpened(prevVal => !prevVal)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            {isPageOpened ?
                <div className="background">
                    <img src={process.env.PUBLIC_URL + "/Images/icon.svg"} alt="The company's icon" />
                    <button 
                        className="container"
                        onClick={() => {
                            navigate(RoutesTypes.MAIN);
                            setIsPageOpened(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <p>Main Page</p>
                    </button>
                    <button
                        className="container"
                        onClick={() => {
                            navigate(RoutesTypes.PROFILE);
                            setIsPageOpened(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                        <p>My Profile</p>
                    </button>
                    <button
                        className="container"
                        onClick={() => {
                            navigate(RoutesTypes.CART);
                            setIsPageOpened(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p>Items</p>
                    </button>
                </div> :
                null}
        </>
    )
}

export default MobileHeader