// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPPgJuvlzjacunQcTey1An9sGR9xI5dpk",
  authDomain: "jalin-54116.firebaseapp.com",
  projectId: "jalin-54116",
  storageBucket: "jalin-54116.firebasestorage.app",
  messagingSenderId: "1055652424019",
  appId: "1:1055652424019:web:ddadf5eb61324b18b159a6",
  measurementId: "G-TM51PPTZKW"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);