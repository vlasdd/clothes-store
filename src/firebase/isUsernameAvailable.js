import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

async function isUsernameAvailable(name){
    const allUsers = await getDocs(collection(db, "users"));
    let isAvailable = true;

    allUsers.forEach(user => {
        const nameOfUser = user.data().username
        if(nameOfUser === name){
            isAvailable = false;
            return;
        }
    })

    return isAvailable;
}

export default isUsernameAvailable;