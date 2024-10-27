
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBMiLbU95cMw5RLctV9JL_6mi9dkUzIbVQ",
  authDomain: "ai-atl-115d5.firebaseapp.com",
  projectId: "ai-atl-115d5",
  storageBucket: "ai-atl-115d5.appspot.com",
  messagingSenderId: "231008655664",
  appId: "1:231008655664:web:41a70b521dc505342b10f5",
  measurementId: "G-MYY9Y6ZCM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export {storage};