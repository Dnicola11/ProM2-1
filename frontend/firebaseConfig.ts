import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyCCgdfy-sE8vC2T1KQlXypLJ2hPXzy-h6I",
  authDomain: "proyectom2-ff9fc.firebaseapp.com",
  projectId: "proyectom2-ff9fc",
  storageBucket: "proyectom2-ff9fc.firebasestorage.app",
  messagingSenderId: "473347652287",
  appId: "1:473347652287:web:76ce0f5013f882bfc1640a",
  measurementId: "G-WM5ZF0R09B"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
