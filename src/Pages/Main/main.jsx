import React from "react";
import { SpecialOffers } from "../../Components";
import { ProductsSet } from "../../Components";
import { ExtraInfo } from "../../Components";
import { motion } from "framer-motion";
import "./main.scss";

export default function Main(){
    return (
        <motion.div
            className="div-column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <SpecialOffers />
            <ProductsSet />
            <ExtraInfo />
        </motion.div>
    )
}