import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import * as RoutesTypes from "../../Constants/routesTypes"
import { setActiveUser } from "../../Redux/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import isUsernameAvailable from "../../Firebase/isUsernameAvailable";
import { motion } from "framer-motion";
import "./sign-up.scss";
import { setIsBeingLoaded } from "../../Redux/Actions/isBeingLoadedActions";
import { setShouldUserLogin } from "../../Redux/Actions/shouldUserLoginActions";

export default function SignUp(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(obj => obj.currentUser.user);
    const shouldUserLogin = useSelector(obj => obj.shouldUserLogin);

    const [userData, setUserData] = useState({
        fullName: "",
        username: "",
        emailAddress: "",
        password: ""
    })
    const [error, setError] = useState(shouldUserLogin ? "You must sign up first" : "");
    const [isAvailable, setIsAvailable] = useState(false);

    const isInvalid = userData.password.length < 6
        || userData.emailAddress.length < 6
        || userData.username.length < 6
        || userData.fullName.length < 6

    useEffect(() => {
        async function asyncHandle() {
            const handleIsAvailable = await isUsernameAvailable(userData.username);

            if (!handleIsAvailable) {
                setError("This username is not available");
                setIsAvailable(false);
                return;
            }

            setError(shouldUserLogin ? "You must sign up first" : "");
            setIsAvailable(true);
        }

        asyncHandle();
    }, [userData.username])

    if (user.username) {
        return <Navigate to={RoutesTypes.PROFILE} />
    }

    async function handleLogin(event) {
        event.preventDefault();
        dispatch(setIsBeingLoaded(true));

        if (!isAvailable) {
            return;
        }

        try {
            const user = await createUserWithEmailAndPassword(auth, userData.emailAddress, userData.password);
            await setDoc(doc(db, "users", user.user.uid), {
                userId: user.user.uid,
                username: userData.username.toLowerCase(),
                fullName: userData.fullName,
                emailAddress: userData.emailAddress,
                gender: "",
                birthday: "",
                phoneNumber: "",
                purchasesList: [],
                profileImage: "",
                dateCreated: Date.now()
            })

            const currentDoc = await getDoc(doc(db, "users", user.user.uid));

            dispatch(setActiveUser(currentDoc.data()));
            if(shouldUserLogin){
                dispatch(setShouldUserLogin(false));
                navigate(RoutesTypes.CART);
            }
            else{
                navigate(RoutesTypes.PROFILE);
            }
        } 
        catch (error) {
            setUserData(prevData => ({...prevData, emailAddress: ""}))
            setUserData(prevData => ({...prevData, password: ""}))
            setError(error.message);
            console.log(error);
        }

        dispatch(setIsBeingLoaded(false));
    }

    return (
        <motion.div 
            className="login-register col-12 col-sm-8 col-md-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <img
                src="../Images/icon.svg"
                className="login-register-icon"
            />
            <h1>Welcome to My Site's Name</h1>

            {error ?
                <p className="info red">{error}</p> :
                <p className="info">Sign up to continue</p>}
            <form
                method="POST"
                className="login-register-form"
            >
                <input
                    aria-label="Enter your username"
                    className=""
                    type="text"
                    placeholder="Username"
                    value={userData.username}
                    onChange={(event) => setUserData(prevData => ({...prevData, username: event.target.value}))}
                />
                <input
                    aria-label="Enter your full name"
                    className=""
                    type="text"
                    placeholder="Full name"
                    value={userData.fullName}
                    onChange={(event) => setUserData(prevData => ({...prevData, fullName: event.target.value}))}
                />
                <input
                    aria-label="Enter your email address"
                    className=""
                    type="text"
                    placeholder="Email address"
                    value={userData.emailAddress}
                    onChange={(event) => setUserData(prevData => ({...prevData, emailAddress: event.target.value}))}
                />
                <input
                    aria-label="Enter your password"
                    className=""
                    autoComplete="on"
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(event) => setUserData(prevData => ({...prevData, password: event.target.value}))}
                />
                <div className="check-out">
                    <button
                        disabled={!isAvailable || isInvalid}
                        type="submit"
                        className={`check-out-button ${(!isAvailable || isInvalid) && "disabled-button"}`}
                        onClick={(event) => handleLogin(event)}
                    >
                        <h2 className="h2-default">Sign up</h2>
                    </button>
                </div>
            </form>
            <div className="link">
                <p className="info">Already have an account?</p>
                <Link to={RoutesTypes.LOGIN} className="info blue">Login</Link>
            </div>
        </motion.div>
    )
}