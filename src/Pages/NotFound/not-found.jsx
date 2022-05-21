import React from "react";
import { motion } from "framer-motion";
import "./not-found.scss";

export default function NotFound(){
    return(
        <motion.div 
            className="special-message col-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <p>Not Found!</p>
        </motion.div>
    )
}