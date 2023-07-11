// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvLLC8AGQ6Aq2bXLA7qlHKSbC0KOgBlMU",
  authDomain: "todo-app-695f4.firebaseapp.com",
  projectId: "todo-app-695f4",
  storageBucket: "todo-app-695f4.appspot.com",
  messagingSenderId: "532801739812",
  appId: "1:532801739812:web:ce1b11220fab26d30f8cb1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const firebase_auth = getAuth(app);

const firebase = {
  app,
  db,
  storage,
 firebase_auth,
};
export default firebase;
