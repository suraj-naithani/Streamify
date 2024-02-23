import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBFpLeAxB3YVxUkGXTP1u8xtsDLg4xv3TA",
    authDomain: "videostream-66bf7.firebaseapp.com",
    projectId: "videostream-66bf7",
    storageBucket: "videostream-66bf7.appspot.com",
    messagingSenderId: "89828304448",
    appId: "1:89828304448:web:a4001ba69f060e749021a5",
    measurementId: "G-9VXQY7SFJK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;