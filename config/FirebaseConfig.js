// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "my-calendar-4786b.firebaseapp.com",
  projectId: "my-calendar-4786b",
  storageBucket: "my-calendar-4786b.appspot.com",
  messagingSenderId: "424575118745",
  appId: "1:424575118745:web:f6de7396a2a2a03a64f708",
  measurementId: "G-C6YV8NJNTW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
