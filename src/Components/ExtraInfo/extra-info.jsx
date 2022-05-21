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
                <img src="../Images/extra-shoes.svg"/>
            </div>
            <div className="info-grid-container col-11">
                <div className="info-grid">
                    <img src="../Images/shipping.svg" />
                    <p className="header">FREE SHIPPING</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <img src="../Images/refund.svg" />
                    <p className="header">100% REFUND</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <img src="../Images/support.svg" />
                    <p className="header">SUPPORT 24/7</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
            <h1 className="h1-black-default">LATEST NEWS</h1>
            <div className="info-grid-container col-11">
                <div className="info-grid">
                    <i>01 Jan, 2022</i>
                    <img src="../Images/nike-logo.svg" />
                    <p className="header">Fashion Industry</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <i>01 Jan, 2022</i>
                    <img src="../Images/figma-logo.svg" />
                    <p className="header">Best Design Tools</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
                <div className="info-grid">
                    <i>01 Jan, 2022</i>
                    <img src="../Images/support.svg" />
                    <p className="header">HR Community</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
        </div>
    )
}