import React from "react";
import "./loading.scss"

export default function Loading(){
    return(
        <>
            <div className="loading-container">
                <div className="loader"></div>
                <h1>Loading...</h1>
            </div>
        </>
    )
}