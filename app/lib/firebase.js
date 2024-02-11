// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClvKIWrZ0mS7ECQajGpirpWF-WEneinIk",
  authDomain: "filmisbest-6b903.firebaseapp.com",
  projectId: "filmisbest-6b903",
  storageBucket: "filmisbest-6b903.appspot.com",
  messagingSenderId: "511130229224",
  appId: "1:511130229224:web:d56802a070daaf0c072c5d",
  measurementId: "G-H205SHVXSL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
