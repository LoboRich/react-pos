import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDZQ-yPEaSSd0Zp8M8pvRAacr0e9l73uqM",
  authDomain: "utak-test-project.firebaseapp.com",
  projectId: "utak-test-project",
  storageBucket: "utak-test-project.appspot.com",
  messagingSenderId: "1046182851020",
  appId: "1:1046182851020:web:54d309779d400cabd46d69",
  measurementId: "G-ZGFX7L9055"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)