// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getAuth } from "firebase/auth"; // For Authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUR9Rk5q5TI0AKS3rzvrbq5f6d1viYnxY",
  authDomain: "hotel-management-e747d.firebaseapp.com",
  databaseURL: "https://hotel-management-e747d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotel-management-e747d",
  storageBucket: "hotel-management-e747d.firebasestorage.app",
  messagingSenderId: "623285654101",
  appId: "1:623285654101:web:c4e26b8c2c0b0252d57adc",
  measurementId: "G-MP1C2P5MWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services for use in other parts of the app
export const db = getDatabase(app); // Realtime Database
export const firestore = getFirestore(app); // Firestore
export const auth = getAuth(app); // Authentication
