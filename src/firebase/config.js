import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWyF6sPWzhG4xo8RUZCt7ISj_8R4QuQZc",
  authDomain: "clothes-store-8cacb.firebaseapp.com",
  projectId: "clothes-store-8cacb",
  storageBucket: "clothes-store-8cacb.appspot.com",
  messagingSenderId: "355264862193",
  appId: "1:355264862193:web:2448236ea6ef0534229650"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app);

export { app, db, auth, storage };