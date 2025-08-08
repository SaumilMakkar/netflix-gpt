// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt7zL0jaj24m7yWQ3wsKaNnlnA5uvW6dM",
  authDomain: "netflixgpt-d045d.firebaseapp.com",
  projectId: "netflixgpt-d045d",
  storageBucket: "netflixgpt-d045d.firebasestorage.app",
  messagingSenderId: "680917799154",
  appId: "1:680917799154:web:977387a618e2dec47a006b",
  measurementId: "G-PEMT2MR9MX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();