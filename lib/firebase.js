import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
  apiKey: "AIzaSyB__Qqup9X-_qkU99Paq5qmigUXaXraCtY",
  authDomain: "nexuschat-28ae9.firebaseapp.com",
  projectId: "nexuschat-28ae9",
  storageBucket: "nexuschat-28ae9.appspot.com",
  messagingSenderId: "671274417925",
  appId: "1:671274417925:web:7fa76090ec6aebd105c16c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {
  app
}

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()