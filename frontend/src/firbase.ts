// firebase.js
import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"


// Declare a global augmentation to the Window interface

const firebaseConfig = {
  apiKey: "AIzaSyAqM9CDG2zCcdPsbPML4GwkabIjKJkZXGc",
  authDomain: "sample-test-7fad4.firebaseapp.com",
  projectId: "sample-test-7fad4",
  storageBucket: "sample-test-7fad4.firebasestorage.app",
  messagingSenderId: "178601000550",
  appId: "1:178601000550:web:2690d87cc57b433e60b7a7",
  measurementId: "G-YFEK69S1KL"
};



const app = initializeApp(firebaseConfig)
export const auth = getAuth(app);
