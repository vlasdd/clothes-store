import React from "react";
import SpecialOffers from "../components/SpecialOffers";
import Products from "../components/Products";
import ExtraInfo from "../components/ExtraInfo";

export default function Main(){
    return(
        <>
            <SpecialOffers />
            <Products />
            <ExtraInfo />
        </>
    )
}