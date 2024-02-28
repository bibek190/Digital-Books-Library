// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqZUKwHa7weQtOMmZycXgNghU56wlV4VA",
  authDomain: "library-management-402de.firebaseapp.com",
  projectId: "library-management-402de",
  storageBucket: "library-management-402de.appspot.com",
  messagingSenderId: "643089520360",
  appId: "1:643089520360:web:663060b06cc3218902db5d",
  measurementId: "G-HWY6R9QTHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
