// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBV-YpTCazp6a2sgKHjeRlEuJOTPc5hBE",
  authDomain: "ecommerceimage-2e2d9.firebaseapp.com",
  projectId: "ecommerceimage-2e2d9",
  storageBucket: "ecommerceimage-2e2d9.appspot.com",
  messagingSenderId: "266140326944",
  appId: "1:266140326944:web:8d2672a600699c3ce03045"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig,"storage");

export const storage = getStorage(app);