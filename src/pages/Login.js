import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as RoutesTypes from "../constants/routesTypes"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../redux/actions/userActions";
import { doc, getDoc } from "firebase/firestore";

export default function Login(){
    const dispatch = useDispatch();
    const user = useSelector(user => user.currentUser.user);
    const navigate = useNavigate();

    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const isInvalid = password.length < 6 || emailAddress.length < 6

    //console.log(user);

    useEffect(() => {
        if(user.username){
            navigate(RoutesTypes.PROFILE)
        }
    }, [])

    async function handleLogin(event){
        event.preventDefault();
        
        try {
            const user = await signInWithEmailAndPassword(auth, emailAddress, password);
            const currentDoc = await getDoc(doc(db, "users", user.user.uid))
            //console.log(currentDoc.data())
            const currentUsername = currentDoc.data()?.username 

            dispatch(setActiveUser(currentDoc.data()));
            navigate(RoutesTypes.PROFILE);
        } 
        catch (error) {
            setEmailAddress('');
            setPassword('');
            setError(error.message);
            console.log(error);
        }
    }

    return (
        <div className="login-register col-12 col-sm-8 col-md-6">
            <img
                src="../images/icon.svg"
                className="login-register-icon"
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
        </div>
    )
}