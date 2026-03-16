import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAYU06p3B6xZKiW3lahUE8I0tcektPyKdo",
  authDomain: "nearserve-78d77.firebaseapp.com",
  projectId: "nearserve-78d77",
  storageBucket: "nearserve-78d77.firebasestorage.app",
  messagingSenderId: "73484149819",
  appId: "1:73484149819:web:9a8c9a94d8ef10a2e2a81e"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.useDeviceLanguage();