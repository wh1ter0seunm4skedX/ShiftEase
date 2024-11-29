import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMkN6x9nXfiJvvwdWkujb9tdFPy4iuLoo",
    authDomain: "shiftease-7cd4c.firebaseapp.com",
    projectId: "shiftease-7cd4c",
    storageBucket: "shiftease-7cd4c.firebasestorage.app",
    messagingSenderId: "416579605082",
    appId: "1:416579605082:web:ff3199d79f7cf268d8be63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };