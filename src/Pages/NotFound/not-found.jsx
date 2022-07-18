import React from "react";
import { motion } from "framer-motion";
import "./not-found.scss";
import * as RoutesTypes from "../../Constants/routesTypes";
import { useNavigate } from "react-router-dom";

export default function NotFound(){
    const navigate = useNavigate();

    return(
        <motion.div 
            className="special-message col-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <img src={process.env.PUBLIC_URL + "/Images/not-found.png"} />
            <p className="h1-black-default">Not Found!</p>
            <button
                onClick={() => navigate(RoutesTypes.MAIN)}
                className="check-out-button"
            >
                <h1 className="h2-default">Back to Home</h1>
            </button>
        </motion.div>
    )
}