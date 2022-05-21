import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/header"
import Loading from "./Components/Loading/loading";
import Footer from "./Components/Footer/footer";
import * as RoutesTypes from "./Constants/routesTypes"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "./Redux/Actions/userActions";
import { setCart } from "./Redux/Actions/cartActions";
import { AnimatePresence } from "framer-motion";
import { setIsBeingLoaded } from "./Redux/Actions/isBeingLoadedActions";
import { setItems } from "./Redux/Actions/itemsActions";

const Main = lazy(() => import("./Pages/Main/main"));
const Cart = lazy(() => import("./Pages/Cart/cart"));
const ProductPage = lazy(() => import("./Pages/ProductPage/product-page"));
const Profile = lazy(() => import("./Pages/Profile/profile"));
const Login = lazy(() => import("./Pages/Login/login"));
const SignUp = lazy(() => import("./Pages/SignUp/sign-up"));
const ChangeProfile = lazy(() => import("./Pages/ChangeProfile/change-profile"));
const NotFound = lazy(() => import("./Pages/NotFound/not-found"))

export default function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(obj => obj.currentUser.user);
    const cart = useSelector(obj => obj.cart);
    const isBeingLoaded = useSelector(obj => obj.isBeingLoaded);
    const allItems = useSelector(obj => obj.allItems);

    useEffect(() => {
        async function fetchData() {
            let res = await fetch("https://fakestoreapi.com/products")
            res = await res.json()
            dispatch(setItems(res));
        }

        async function handleStorage(){
            if (localStorage.getItem("currentUser")) {
                dispatch(setActiveUser(JSON.parse(localStorage.getItem("currentUser"))))
            }
    
            if (localStorage.getItem("cart")) {
                dispatch(setCart((JSON.parse(localStorage.getItem("cart")))))
            }
        }

        fetchData();
        handleStorage();
    }, [])

    useEffect(() => {
        const { CHANGE_PROFILE, PROFILE, NOT_FOUND, LOGIN, SIGN_UP } = RoutesTypes;
        if (!allItems.length &&
            [
                CHANGE_PROFILE,
                PROFILE,
                NOT_FOUND,
                LOGIN,
                SIGN_UP
            ].every(name => name !== location.pathname)) {
            dispatch(setIsBeingLoaded(true));
        }
        else {
            dispatch(setIsBeingLoaded(false));
        }
    }, [allItems, location])

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(user));
    }, [user])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    return (
        <AnimatePresence>
            <Suspense fallback={<div></div>}>
                {isBeingLoaded ?
                    <Loading /> :
                    <div className="main-page">
                        <Header />
                        <Routes location={location} key={location.pathname}>
                            <Route path={RoutesTypes.NOT_FOUND} element={<NotFound />} />
                            <Route path={RoutesTypes.MAIN} element={<Main />} />
                            <Route path={RoutesTypes.CART} element={<Cart />} />
                            <Route path={`${RoutesTypes.PRODUCT_PAGE}:id`} element={<ProductPage />} />
                            <Route path={RoutesTypes.PROFILE} element={<Profile />} />
                            <Route path={RoutesTypes.LOGIN} element={<Login />} />
                            <Route path={RoutesTypes.SIGN_UP} element={<SignUp />} />
                            <Route path={RoutesTypes.CHANGE_PROFILE} element={<ChangeProfile />} />
                        </Routes>
                        <Footer />
                    </div>}
            </Suspense>
        </AnimatePresence>
    )
}