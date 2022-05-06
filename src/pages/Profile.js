import React, { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeActiveUser } from '../redux/actions/userActions'
import { Context } from '../CartContext'
import * as RouteTypes from "../constants/routesTypes"
import { deleteDoc, doc } from 'firebase/firestore'
import { db, storage } from '../firebase/config'
import { deleteObject, ref } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

export default function Profile() {
    const user = useSelector(user => user.currentUser.user)
    const { setIsBeingLoaded } = useContext(Context);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState();

    useEffect(() => {
        if(!user.username){
            navigate(RouteTypes.LOGIN)
        }
    }, [user])

    async function deleteUser(){
        setIsBeingLoaded(true);

        if(user.profileImage !== ""){
            const deleteImageRef = ref(storage, user.profileImage);
            await deleteObject(deleteImageRef);
        }

        await deleteDoc(doc(db, "users", user.userId));

        await getAuth().currentUser.delete();
        dispatch(removeActiveUser());

        setIsBeingLoaded(false);
    }

    function signOut(){
        dispatch(removeActiveUser());
    }

    return (
        <>
            <div className="profile col-12 col-sm-11 col-md-10">
                <div className="profile-image">
                    <img
                        src={user.profileImage || "../images/default-avatar-image.jpg"}
                        className=""
                    />
                </div>
                <div className="profile-container">
                    <div className="profile-info">
                        <div>
                            <h1>{user.fullName}</h1>
                            <p className="info">{`@${user.username}`}</p>
                        </div>
                        <button onClick={() => setIsHovered(prevVal => !prevVal)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                        {isHovered &&
                            <div className="links-container">
                                <button onClick={deleteUser}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                                <button onClick={signOut}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <Link to={RouteTypes.CHANGE_PROFILE}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </Link>
                            </div>
                        }
                    </div>
                    <div className="profile-features">
                        <div className="profile-feature">
                            <div>
                                <img src="../images/user.svg" />
                                <h1>Gender</h1>
                            </div>
                            <p className="info">{user.gender || "unknown"}</p>
                        </div>
                        <div className="profile-feature">
                            <div>
                                <img src="../images/date.svg" />
                                <h1>Birthday</h1>
                            </div>
                            <p className="info">{user.birthday || "unknown"}</p>
                        </div>
                        <div className="profile-feature">
                            <div>
                                <img src="../images/message.svg" />
                                <h1>Email</h1>
                            </div>
                            <p className="info">{user.emailAddress}</p>
                        </div>
                        <div className="profile-feature">
                            <div>
                                <img src="../images/phone.svg" />
                                <h1>Phone number</h1>
                            </div>
                            <p className="info">{user.phoneNumber || "unknown"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}