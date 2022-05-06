import React, { useState, useEffect, useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as RoutesTypes from "../constants/routesTypes"
import isUsernameAvailable from "../firebase/isUsernameAvailable";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../firebase/config";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setActiveUser } from "../redux/actions/userActions";
import { updateEmail, getAuth } from "firebase/auth";
import { Context } from "../CartContext";
import { v4 } from "uuid";

export default function ChangeProfile(){
    const { setIsBeingLoaded } = useContext(Context);
    const user = useSelector(user => user.currentUser.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputFileRef = useRef(null);
    const [changeProfileImage, setChangeProfileImage] = useState(false);
    const [imageUpload, setImageUpload] = useState(null);
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
        if(!user.username){
            navigate(RoutesTypes.LOGIN)
        }
    }, [])

    useEffect(() => {
        async function asyncPromise(){
            if(["", "Male", "Female"].every(elem => elem !== profileInfo.gender)){
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

    async function uploadImage(){
        if(!imageUpload){
            return;
        }
        setIsBeingLoaded(true);

        if (user.profileImage !== "") {
            const deleteImageRef = ref(storage, user.profileImage);
            await deleteObject(deleteImageRef);
        }

        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
        await uploadBytes(imageRef, imageUpload)

        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", user.userId), {
            profileImage: imageUrl
        });

        dispatch(setActiveUser({...user, profileImage: imageUrl}));
        setImageUpload(null);

        setIsBeingLoaded(false);
        navigate(RoutesTypes.PROFILE)
    }

    async function deleteImage(){
        if(imageUpload){
            setImageUpload(null);
            inputFileRef.current.value = "";
            return;
        }
        setIsBeingLoaded(true);

        const imageRef = ref(storage, user.profileImage);
        await deleteObject(imageRef);

        await updateDoc(doc(db, "users", user.userId), {
            profileImage: ""
        });

        dispatch(setActiveUser({...user, profileImage: ""}));

        setIsBeingLoaded(false);
        navigate(RoutesTypes.PROFILE);
    }

    async function handleChange(event) {
        event.preventDefault();
        setIsBeingLoaded(true);

        await updateDoc(doc(db, "users", user.userId), profileInfo)

        if (user.emailAddress !== profileInfo.emailAddress) {
            const currentAuth = getAuth();
            await updateEmail(currentAuth.currentUser, profileInfo.emailAddress);
        }

        dispatch(setActiveUser({...user, ...profileInfo}))

        setIsBeingLoaded(false);
        navigate(RoutesTypes.PROFILE)
    }

    return (
        <div className="login-register col-11 col-sm-8 col-md-9 col-lg-7">
            <img
                src="../images/icon.svg"
                className="login-register-icon"
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
                <>
                    <h1>Change Profile Image</h1>
                    <p className="info">Push <b>Upload an image</b> and <b>Save</b> to continue</p>
                    <div className="profile-image">
                        <img
                            src={imageUpload ? URL.createObjectURL(imageUpload) : user.profileImage ? user.profileImage : "../images/default-avatar-image.jpg"}
                            className=""
                        />
                    </div>
                    {(imageUpload || user.profileImage) &&
                        <button
                            className="delete-button"
                            onClick={deleteImage}
                        >
                            <img src="../images/delete-icon.svg" />
                            <p className="info red">Delete image</p>
                        </button>
                    }
                    <div className="images-button-container">
                        <label className="check-out-button choose-image">
                            <input
                                type="file"
                                accept="image/png, image/jpg, image/jpeg"
                                ref={inputFileRef}
                                onChange={(event) => setImageUpload(event.target.files[0])}
                            />
                            <p>Upload an image</p>
                        </label>
                        <button
                            disabled={!imageUpload}
                            className={`check-out-button choose-image ${!imageUpload && "disabled-button"}`}
                            onClick={uploadImage}
                        >
                            <p>Save</p>
                        </button>
                    </div>
                </> :
                <>
                    <h1>Change Profile Data</h1>
                    {errors.length ?
                        <p className="info red">{errors}</p> :
                        <p className="info">Push <b>Change</b> to continue</p>
                    }
                    <form
                        method="POST"
                        className= "login-register-form change-user-form"
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
                                onClick={(event) => handleChange(event)}
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
    )
}