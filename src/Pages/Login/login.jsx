import React, { useState  } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import * as RoutesTypes from "../../Constants/routesTypes"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../../Redux/Actions/userActions";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import "./login.scss";
import { setIsBeingLoaded } from "../../Redux/Actions/isBeingLoadedActions";
import { setShouldUserLogin } from "../../Redux/Actions/shouldUserLoginActions";

export default function Login(){
    const dispatch = useDispatch();
    const user = useSelector(obj => obj.currentUser.user);
    const shouldUserLogin = useSelector(obj => obj.shouldUserLogin);
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(shouldUserLogin ? "You must login first" : "");

    const isInvalid = password.length < 6 || emailAddress.length < 6

    if (user.username) {
        return <Navigate to={RoutesTypes.PROFILE}/>
    }

    async function handleLogin(event){
        event.preventDefault();
        dispatch(setIsBeingLoaded(true));
        
        try {
            const user = await signInWithEmailAndPassword(auth, emailAddress, password);
            const currentDoc = await getDoc(doc(db, "users", user.user.uid))
            console.log(currentDoc.data())

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
            setEmailAddress('');
            setPassword('');
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
                alt="The company's logo"
            />
            <h1>Welcome to My Site's Name</h1>
            {error ?
                <p className="info red">{error}</p> :
                <p className="info">Sign in to continue</p>}
            <form
                method="POST"
                className="login-register-form"
            >
                <input
                    aria-label="Enter your email address"
                    className=""
                    type="text"
                    placeholder="Email address"
                    value={emailAddress}
                    onChange={(event) => setEmailAddress(event.target.value)}
                />
                <input
                    aria-label="Enter your password"
                    className=""
                    autoComplete="on"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <div className="check-out">
                    <button
                        disabled={isInvalid}
                        type="submit"
                        className={`check-out-button ${isInvalid && "disabled-button"}`}
                        onClick={(event) => handleLogin(event)}
                    >
                        <h2 className="h2-default">Log In</h2>
                    </button>
                </div>
            </form>
            <a className="info blue">Forgot password?</a>
            <div className="link">
                <p className="info">Don't have an account?</p>
                <Link to={RoutesTypes.SIGN_UP} className="info blue">Sign up</Link>
            </div>
        </motion.div>
    )
}