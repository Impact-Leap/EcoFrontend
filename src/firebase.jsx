import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: 'AIzaSyCRvw-GdCg56E9qB9IYo46VVwG7sU9JaAM',

  authDomain: 'carbon-footprint-29d13.firebaseapp.com',

  projectId: 'carbon-footprint-29d13',

  storageBucket: "carbon-footprint-29d13.firebasestorage.app",

  messagingSenderId: "430092380036",

  appId: "1:430092380036:web:744a9bb4842e15a432dfd1",

  measurementId: "G-M70TGLZVPC"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider();
