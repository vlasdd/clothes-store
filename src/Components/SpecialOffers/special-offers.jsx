import React from "react";
import "./special-offers.scss";

export default function SpecialOffers(){
    return(
        <div className="offers-container">
            <div className="recom-prod col-11 col-sm-11 col-md-10">
                <h1 className="h1-default">My Site's Name</h1>
                <div>
                    <h1 className="h1-default">Super Flash Sale</h1>
                    <h1 className="h1-default"> 50% Off</h1>
                </div>
                <h2 className="h2-default">We recommend the best for you</h2>
            </div>
        </div>
    )
}