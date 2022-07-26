import React from "react"
import useWindowWidth from "../../Helpers/useWindowWidth";
import MobileHeader from "../MobileHeader/mobile-header";
import PCHeader from "../PCHeader/pc-header";
import "./header.scss"

export default function Header(){
    const width = useWindowWidth();

    return (
        width > 730 ?
            <PCHeader /> :
            <MobileHeader />
    )
}