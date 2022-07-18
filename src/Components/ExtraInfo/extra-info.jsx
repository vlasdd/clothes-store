import React from "react";
import "./extra-info.scss";

export default function ExtraInfo(){
    return (
        <div className="extra-info-container">
            <div className="addidas-sneakers col-12">
                <div className="addidas-text">
                    <h1 className="h1-default">Adidas Men Running Sneakers</h1>
                    <h2 className="h2-default">Performance and design. Taken right to the edge.</h2>
                </div>
                <img src={process.env.PUBLIC_URL + "/Images/extra-shoes.svg"} alt="Shoes"/>
            </div>
            <div className="info-grid-container col-11">
                <div className="info-grid">
                    <img src={process.env.PUBLIC_URL + "/Images/shipping.svg"} alt="Shipping"/>
                    <p className="header">FREE SHIPPING</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <img src={process.env.PUBLIC_URL + "/Images/refund.svg"} alt="Refund"/>
                    <p className="header">100% REFUND</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <img src={process.env.PUBLIC_URL + "/Images/support.svg"} alt="Support"/>
                    <p className="header">SUPPORT 24/7</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
            <h1 className="h1-black-default">LATEST NEWS</h1>
            <div className="info-grid-container col-11">
                <div className="info-grid">
                    <i>01 Jan, 2022</i>
                    <img src={process.env.PUBLIC_URL + "/Images/nike-logo.svg"} alt="Nike logo"/>
                    <p className="header">Fashion Industry</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <i>01 Jan, 2022</i>
                    <img src={process.env.PUBLIC_URL + "/Images/figma-logo.svg"} alt="Figma logo"/>
                    <p className="header">Best Design Tools</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <i>01 Jan, 2022</i>
                    <img src={process.env.PUBLIC_URL + "/Images/support.svg"} alt="Support"/>
                    <p className="header">HR Community</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </div>
    )
}