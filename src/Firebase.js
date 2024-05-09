// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB6IGu1N_1kxzEEh5asPSqoo4S34m6CKq4",
  authDomain: "cybersleuthpartner.firebaseapp.com",
  projectId: "cybersleuthpartner",
  storageBucket: "cybersleuthpartner.appspot.com",
  messagingSenderId: "500203179902",
  appId: "1:500203179902:web:3c2383d39840727ef66d2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
