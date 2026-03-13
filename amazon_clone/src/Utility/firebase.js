import { initializeApp } from "firebase/app";
//authentication
import {getAuth}  from "firebase/auth"
import {getFirestore}  from "firebase/firestore"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrhYJxhCmK6_6kOI-KGhtyKtK2D-iNU34",
  authDomain: "e-clone-864bd.firebaseapp.com",
  projectId: "e-clone-864bd",
  storageBucket: "e-clone-864bd.firebasestorage.app",
  messagingSenderId: "55936153882",
  appId: "1:55936153882:web:42427f3bd9a7c9c4f494a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)