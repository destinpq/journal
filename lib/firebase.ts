// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdJYOjIuQ2w1aEscLr_kD3q3IO5uFPxWY",
  authDomain: "journal-dec12.firebaseapp.com",
  projectId: "journal-dec12",
  storageBucket: "journal-dec12.firebasestorage.app",
  messagingSenderId: "534952391913",
  appId: "1:534952391913:web:8c46a8722f9468825d6c78",
  measurementId: "G-THFXHNK8DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize Analytics (only in browser environment)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { analytics };
export default app; 