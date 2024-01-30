// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string; 
  }
const firebaseConfig: FirebaseConfig =  {
  apiKey: "AIzaSyAKkJPHgrBMLsdm4E4kr_7_vccze7TVBmg",
  authDomain: "ts-react-app-641ea.firebaseapp.com",
  projectId: "ts-react-app-641ea",
  storageBucket: "ts-react-app-641ea.appspot.com",
  messagingSenderId: "1051891592676",
  appId: "1:1051891592676:web:74150f66f8bb8dfa212bf1",
  measurementId: "G-RS5D29ZHFG"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);