import React, { useState, useRef } from "react";
import { v4 } from "uuid";
import { deleteObject, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";
import { storage, db } from "../../Firebase/config";
import { setActiveUser } from "../../Redux/Actions/userActions";
import * as RoutesTypes from "../../Constants/routesTypes";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./change-profile-image.scss";
import { setIsBeingLoaded } from "../../Redux/Actions/isBeingLoadedActions";

export default function ChangeImage(){
    const user = useSelector(obj => obj.currentUser.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const inputFileRef = useRef(null);

    const [imageUpload, setImageUpload] = useState(null);

    async function uploadImage(){
        if(!imageUpload){
            return;
        }
        dispatch(setIsBeingLoaded(true));

        if (user.profileImage !== "") {
            const deleteImageRef = ref(storage, user.profileImage);
            await deleteObject(deleteImageRef);
        }

        const imageRef = ref(storage, `Images/${imageUpload.name + v4()}`)
        await uploadBytes(imageRef, imageUpload)

        const imageUrl = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "users", user.userId), {
            profileImage: imageUrl
        });

        dispatch(setActiveUser({...user, profileImage: imageUrl}));
        setImageUpload(null);

        dispatch(setIsBeingLoaded(false));
        navigate(RoutesTypes.PROFILE)
    }

    async function deleteImage(){
        if(imageUpload){
            setImageUpload(null);
            inputFileRef.current.value = "";
            return;
        }
        dispatch(setIsBeingLoaded(true));

        const imageRef = ref(storage, user.profileImage);
        await deleteObject(imageRef);

        await updateDoc(doc(db, "users", user.userId), {
            profileImage: ""
        });

        dispatch(setActiveUser({...user, profileImage: ""}));

        dispatch(setIsBeingLoaded(false));
        navigate(RoutesTypes.PROFILE);
    }

    return (
        <>
            <h1>Change Profile Image</h1>
            <p className="info">Push <b>Upload an image</b> and <b>Save</b> to continue</p>
            <div className="profile-image">
                <img
                    src={imageUpload ? URL.createObjectURL(imageUpload) : user.profileImage ? user.profileImage : "../Images/default-avatar-image.jpg"}
                    className=""
                />
            </div>
            {(imageUpload || user.profileImage) &&
                <button
                    className="delete-button"
                    onClick={deleteImage}
                >
                    <img src="../Images/delete-icon.svg" />
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
        </>
    )
}