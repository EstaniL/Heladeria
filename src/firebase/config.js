// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

//Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2Eh3QL7j6e-0HqwkyX7_iqQkue1y0kR4",
  authDomain: "heladeria-1a209.firebaseapp.com",
  projectId: "heladeria-1a209",
  storageBucket: "heladeria-1a209.appspot.com",
  messagingSenderId: "87260837687",
  appId: "1:87260837687:web:4c528cf9f0ec2e46018cb2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const initFirestore =()=>{
    return app
}