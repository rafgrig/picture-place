// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, doc, getDoc} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries// Your web app's Firebase configuration

const firebaseConfig = {
 apiKey: "AIzaSyCyZu0wtr8YveRdZmY2dfowH0ndzx0K92c",
 authDomain: "picture-place.firebaseapp.com",
 projectId: "picture-place",
 storageBucket: "picture-place.firebasestorage.app",
 messagingSenderId: "623730100440",
 appId: "1:623730100440:web:954c2cf5b469293fbb2fad"
};// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)