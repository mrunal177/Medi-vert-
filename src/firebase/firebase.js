import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-oe_Y5ZumddzDjFvYVkeGLwekiVvDDDk",
  authDomain: "medivert-7d931.firebaseapp.com",
  projectId: "medivert-7d931",
  storageBucket: "medivert-7d931.firebasestorage.app",
  messagingSenderId: "106529860792",
  appId: "1:106529860792:web:829dd43802954c1d25984d"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


