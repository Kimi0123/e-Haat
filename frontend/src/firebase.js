import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCurbawO0ceCH8lzqB1xIRHjzIvsnJRFVY",
  authDomain: "ehaat-c9105.firebaseapp.com",
  projectId: "ehaat-c9105",
  storageBucket: "ehaat-c9105.firebasestorage.app",
  messagingSenderId: "417632600124",
  appId: "1:417632600124:web:d2ebdd23e8ed0cd8dbc339"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
