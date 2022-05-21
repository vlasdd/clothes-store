import React from "react";
import "./footer.scss";
import { useSelector } from "react-redux";

export default function Footer(){
    const isPageDisabled = useSelector(obj => obj.isPageDisabled);

    return(
        <footer className={`col-12 ${isPageDisabled && "disabled-page"}`}>
            <div className="info-grid-container">
                <div className="info-grid">
                    <p className="header">My Fake Site's Name</p>
                    <p className="regular-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.Since the 1500s, when an unknown printer.</p>
                </div>
                <div className="info-grid">
                    <p className="header">Contact Us</p>
                    <p className="regular-text">E-Comm , 4578 Marmora Road, Glasgow D04 89GR</p>
                </div>
                <div className="info-grid">
                    <p className="header">Follow Us</p>
                    <p className="regular-text">Since the 1500s, when an unknown printer took a galley of type and scrambled.</p>
                </div>
            </div>
        </footer>
    )
}