import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import * as RoutesTypes from "../../Constants/routesTypes"
import isUsernameAvailable from "../../Firebase/isUsernameAvailable";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { setActiveUser } from "../../Redux/Actions/userActions";
import { updateEmail, getAuth } from "firebase/auth";
import { Confirmation } from "../../Components";
import { motion } from "framer-motion";
import { ChangeImage } from "../../Components";
import "./change-profile.scss";
import { setIsPageDisabled } from "../../Redux/Actions/disabledActions";
import { setIsBeingLoaded } from "../../Redux/Actions/isBeingLoadedActions";

export default function ChangeProfile() {
    const user = useSelector(obj => obj.currentUser.user);
    const isPageDisabled = useSelector(obj => obj.isPageDisabled);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [changeProfileImage, setChangeProfileImage] = useState(false);
    const [errors, setErrors] = useState("");
    const [profileInfo, setProfileInfo] = useState({
        emailAddress: user.emailAddress,
        username: user.username,
        fullName: user.fullName,
        gender: user.gender,
        birthday: user.birthday,
        phoneNumber: user.phoneNumber,
    })
    const [isAvailable, setIsAvailable] = useState(false);

    const isInvalid = profileInfo.emailAddress.length < 6
        || profileInfo.username.length < 6
        || profileInfo.fullName.length < 6

    useEffect(() => {
        async function asyncPromise() {
            if (["", "Male", "Female"].every(elem => elem !== profileInfo.gender)) {
                setErrors("The gender can only be \"Male\" or \"Female\"");
                setIsAvailable(false);
                return;
            }
            setErrors("");

            const handleIsAvailable = await isUsernameAvailable(profileInfo.username);

            if (!handleIsAvailable && profileInfo.username !== user.username) {
                setErrors("This username is not available");
                setIsAvailable(false);
                return;
            };
            setErrors("");

            setIsAvailable(true);
            return;
        }

        asyncPromise();
    }, [profileInfo.username, profileInfo.gender])

    if (!user.username) {
        return <Navigate to={RoutesTypes.LOGIN} />
    }

    async function handleChange() {
        dispatch(setIsBeingLoaded(true));

        await updateDoc(doc(db, "users", user.userId), profileInfo)

        if (user.emailAddress !== profileInfo.emailAddress) {
            const currentAuth = getAuth();
            await updateEmail(currentAuth.currentUser, profileInfo.emailAddress);
        }

        dispatch(setActiveUser({ ...user, ...profileInfo }))

        dispatch(setIsBeingLoaded(false));
        navigate(RoutesTypes.PROFILE)
    }

    return (
        <motion.div
            className="div-column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {isPageDisabled &&
                <Confirmation
                    text="change your profile"
                    callback={handleChange}
                />
            }
            <div className={`login-register col-11 col-sm-8 col-md-9 col-lg-7 col-xl-6 ${isPageDisabled && "disabled-page"}`}>
                <img
                    src={process.env.PUBLIC_URL + "/Images/icon.svg"}
                    className="login-register-icon"
                    alt="The company's logo"
                />
                <button
                    className="switch"
                    onClick={() => setChangeProfileImage(prevVal => !prevVal)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </button>
                {changeProfileImage ?
                    <ChangeImage /> :
                    <>
                        <h1>Change Profile Data</h1>
                        {errors.length ?
                            <p className="info red">{errors}</p> :
                            <p className="info">Push <b>Change</b> to continue</p>
                        }
                        <form
                            method="POST"
                            className="login-register-form change-user-form"
                        >
                            <div>
                                <p className="">Username</p>
                                <input
                                    aria-label="Enter your username"
                                    className="change-user-input"
                                    type="text"
                                    placeholder="Username"
                                    value={profileInfo.username}
                                    onChange={(event) => setProfileInfo(prevInfo => ({ ...prevInfo, username: event.target.value }))}
                                />
                            </div>
                            <div>
                                <p className="">Full Name</p>
                                <input
                                    aria-label="Enter your full name"
                                    className="change-user-input"
                                    type="text"
                                    placeholder="Full name"
                                    value={profileInfo.fullName}
                                    onChange={(event) => setProfileInfo(prevInfo => ({ ...prevInfo, fullName: event.target.value }))}
                                />
                            </div>
                            <div>
                                <p className="">Email Address</p>
                                <input
                                    aria-label="Enter your email address"
                                    className="change-user-input"
                                    type="text"
                                    placeholder="Email address"
                                    value={profileInfo.emailAddress}
                                    onChange={(event) => setProfileInfo(prevInfo => ({ ...prevInfo, emailAddress: event.target.value }))}
                                />
                            </div>
                            <div>
                                <p className="">Gender</p>
                                <input
                                    aria-label="Enter your gender"
                                    className="change-user-input"
                                    type="text"
                                    placeholder="Gender"
                                    value={profileInfo.gender}
                                    onChange={(event) => setProfileInfo(prevInfo => ({ ...prevInfo, gender: event.target.value }))}
                                />
                            </div>
                            <div>
                                <p className="">Birthday</p>
                                <input
                                    aria-label="Enter your birthday"
                                    className="change-user-input"
                                    type="text"
                                    placeholder="Birthdate"
                                    value={profileInfo.birthday}
                                    onFocus={(event) => (event.target.type = "date")}
                                    onChange={(event) => setProfileInfo(prevInfo => ({ ...prevInfo, birthday: event.target.value }))}
                                />
                            </div>
                            <div>
                                <p className="">Phone Number</p>
                                <input
                                    aria-label="Enter your phone number"
                                    className="change-user-input"
                                    type="tel"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    placeholder="Phone number"
                                    value={profileInfo.phoneNumber}
                                    onChange={(event) => setProfileInfo(prevInfo => ({ ...prevInfo, phoneNumber: event.target.value }))}
                                />
                            </div>
                            <div className="check-out">
                                <button
                                    disabled={!isAvailable || isInvalid}
                                    type="submit"
                                    className={`check-out-button ${(!isAvailable || isInvalid) && "disabled-button"}`}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        dispatch(setIsPageDisabled(true));
                                    }}
                                >
                                    <h2 className="h2-default">Change</h2>
                                </button>
                            </div>
                        </form>
                    </>
                }
                <div className="link">
                    <p className="info">Return to</p>
                    <Link to={RoutesTypes.PROFILE} className="info blue">Profile</Link>
                </div>
            </div>
        </motion.div>
    )
}