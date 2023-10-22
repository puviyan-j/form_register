import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyCdnWLY0Oh7zlafhpvODJAIo7M7YBNKJKw",
    authDomain: "register-form-9c593.firebaseapp.com",
    projectId: "register-form-9c593",
    storageBucket: "register-form-9c593.appspot.com",
    messagingSenderId: "822965871762",
    appId: "1:822965871762:web:e43b766d424990b8d9f24b",
    measurementId: "G-S0VV59PS64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export { app, auth }