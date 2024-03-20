// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   apiKey:'AIzaSyAw7xmQZdv9m8bCA40EoIhGy3kkwrhJiD8',
  authDomain:import.meta.env.VITE_FIREBASE_AUTHDOMAIN ,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket:import.meta.env.VITE_STORAGE_BUCKET ,
  messagingSenderId:import.meta.env.VITE_MESSAGEING_ID ,
  appId:import.meta.env.VITE_APP_ID 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);