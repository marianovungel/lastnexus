import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAfFg09xqN6m_bRvTWd_H8Fq0N8XRcJ6V4",
  authDomain: "unilabtemfist.firebaseapp.com",
  projectId: "unilabtemfist",
  storageBucket: "unilabtemfist.appspot.com",
  messagingSenderId: "603975237148",
  appId: "1:603975237148:web:d0383e4c39a0fa29e9a9d9",
  measurementId: "G-GXRD7WZ06X"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const imageDb = getStorage(app)