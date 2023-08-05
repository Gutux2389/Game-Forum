// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK4tXszIfbYE_k7-MXeTM3Mpfr8NoCpQg",
  authDomain: "react-ecommerce-17fb6.firebaseapp.com",
  projectId: "react-ecommerce-17fb6",
  storageBucket: "react-ecommerce-17fb6.appspot.com",
  messagingSenderId: "13267014584",
  appId: "1:13267014584:web:ed7cfd7af241d92691f54d"
};
// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);




export const db = getFirestore(app);
