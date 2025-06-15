// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkpEDPF8tFvsOAJk8Qgqgyo8V6AI7KjAY",
  authDomain: "doodlecaboodle-7ae52.firebaseapp.com",
  projectId: "doodlecaboodle-7ae52",
  storageBucket: "doodlecaboodle-7ae52.firebasestorage.app",
  messagingSenderId: "406666826825",
  appId: "1:406666826825:web:dee06f4e494ae67f1cdb98",
  measurementId: "G-6SECFDMSPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
