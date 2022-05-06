import React from "react";

export default function Footer(){
    return(
        <footer className="col-12">
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