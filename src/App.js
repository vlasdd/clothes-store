import React, { useContext, useEffect } from "react";
import { Context } from "./CartContext"
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header"
import Main from "./pages/Main"
import Cart from "./pages/Cart"
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import ItemsPage from "./pages/ItemsPage"
import Profile from "./pages/Profile"
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ChangeProfile from "./pages/ChangeProfile";
import * as RoutesTypes from "./constants/routesTypes"
import { useLocation } from "react-router-dom";

export default function App() {
    const { allItems, isBeingLoaded, setIsBeingLoaded } = useContext(Context)
    const location = useLocation();
    //console.log(allItems);

    useEffect(() => {
        if (!allItems.length &&
            [
                RoutesTypes.PROFILE,
                RoutesTypes.LOGIN,
                RoutesTypes.SIGN_UP,
                RoutesTypes.CHANGE_PROFILE
            ].every(name => name !== location.pathname)) {
                setIsBeingLoaded(true);
        }
        else{
            setIsBeingLoaded(false);
        }
    }, [allItems])

    return (
        <>
            {isBeingLoaded ?
                <Loading /> :
                <div className="main-page">
                    <Header />
                    <Routes>
                        <Route path={RoutesTypes.MAIN} element={ <Main /> }/>
                        <Route path={RoutesTypes.CART}  element={ <Cart /> }/>
                        <Route path={`${RoutesTypes.PRODUCT_PAGE}:id`} element={ <ProductPage /> }/>
                        <Route path={RoutesTypes.ITEMS_PAGE} element={ <ItemsPage /> }/>
                        <Route path={RoutesTypes.PROFILE} element={ <Profile/> }/>
                        <Route path={RoutesTypes.LOGIN} element={ <Login /> }/>
                        <Route path={RoutesTypes.SIGN_UP} element={ <SignUp/> }/>
                        <Route path={RoutesTypes.CHANGE_PROFILE} element={ <ChangeProfile/> }/>
                    </Routes>
                    <Footer />
                </div>}
        </>
    )
}