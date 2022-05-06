import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import * as RoutesTypes from "../constants/routesTypes"
import { setActiveUser } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import isUsernameAvailable from "../firebase/isUsernameAvailable";

export default function SignUp(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(user => user.currentUser.user);

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);

    const isInvalid = password.length < 6
        || emailAddress.length < 6
        || username.length < 6
        || fullName.length < 6
        
    useEffect(() => {
        if(user.username){
            navigate(RoutesTypes.PROFILE)
        }
    }, [])

    useEffect(() => {
        async function asyncHandle() {
            const handleIsAvailable = await isUsernameAvailable(username);

            if (!handleIsAvailable) {
                setError("This username is not available");
                setIsAvailable(false);
                return;
            }

            setError("");
            setIsAvailable(true);
        }

        asyncHandle();
    }, [username])

    async function handleLogin(event) {
        event.preventDefault();

        if (!isAvailable) {
            return;
        }

        try {
            const user = await createUserWithEmailAndPassword(auth, emailAddress, password);
            await setDoc(doc(db, "users", user.user.uid), {
                userId: user.user.uid,
                username: username.toLowerCase(),
                fullName: fullName,
                emailAddress: emailAddress,
                gender: "",
                purchasesList: [],
                profileImage: "",
                dateCreated: Date.now()
            })

            const currentDoc = await getDoc(doc(db, "users", user.user.uid));

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
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <input
                    aria-label="Enter your full name"
                    className=""
                    type="text"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                />
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
        </div>
    )
}