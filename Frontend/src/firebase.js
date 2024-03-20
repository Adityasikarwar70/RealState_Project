// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   apiKey:'AIzaSyAw7xmQZdv9m8bCA40EoIhGy3kkwrhJiD8',
  authDomain: "mern-estate-90cc4.firebaseapp.com",
  projectId: "mern-estate-90cc4",
  storageBucket: "mern-estate-90cc4.appspot.com",
  messagingSenderId: "273023339218",
  appId: "1:273023339218:web:f9ff3f6740a8cb560ffb0b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);