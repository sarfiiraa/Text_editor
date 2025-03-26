import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxB0Ph-lgXnorXxKPffQkpXMvFvROfcLA",
    authDomain: "letterapp-1fd56.firebaseapp.com",
    projectId: "letterapp-1fd56",
    storageBucket: "letterapp-1fd56.appspot.com",  // 🔥 Fix typo here (appspot.com, not firebasestorage.app)
    messagingSenderId: "780230880692",
    appId: "1:780230880692:web:199dd37d8b2a4f5d4556e1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
