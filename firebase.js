// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgItOcd6bgG0vGwT69InDvelxWsZdCfKM",
  authDomain: "nearserve-9b313.firebaseapp.com",
  projectId: "nearserve-9b313",
  storageBucket: "nearserve-9b313.firebasestorage.app",
  messagingSenderId: "901450894017",
  appId: "1:901450894017:web:3c912c5611af46af576240",
  measurementId: "G-V5T94J1BSV"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();


export {auth};