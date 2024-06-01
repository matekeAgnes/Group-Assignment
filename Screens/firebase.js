import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore, addDoc } from "firebase/firestore"; // Import addDoc
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmRAFiBfbg9HpUO1h4W8kHsS9K5Mouqqc",
  authDomain: "lendeasel.firebaseapp.com",
  projectId: "lendeasel",
  storageBucket: "lendeasel.appspot.com",
  messagingSenderId: "284946404208",
  appId: "1:284946404208:web:7880225efb09a13a0e75b5"
};

// Check if a Firebase app is already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Firebase Auth with Async Storage persistence
const auth = !getApps().length 
  ? initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    })
  : getAuth(app);

const db = getFirestore(app);

export { auth, db, addDoc }; 