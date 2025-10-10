import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeDQY99xdQUqXhDFmTvvAnK6fETrYn1yo",
  authDomain: "lastexam-d816a.firebaseapp.com",
  projectId: "lastexam-d816a",
  storageBucket: "lastexam-d816a.firebasestorage.app",
  messagingSenderId: "249530652289",
  appId: "1:249530652289:web:d46f871913b2685d325f80",
  measurementId: "G-RXYL2C3SKY",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
