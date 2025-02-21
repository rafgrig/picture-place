
import { initializeApp } from "firebase/app";
import {getFirestore, doc, getDoc} from "firebase/firestore"
const firebaseConfig = {
 apiKey: "AIzaSyCyZu0wtr8YveRdZmY2dfowH0ndzx0K92c",
 authDomain: "picture-place.firebaseapp.com",
 projectId: "picture-place",
 storageBucket: "picture-place.firebasestorage.app",
 messagingSenderId: "623730100440",
 appId: "1:623730100440:web:954c2cf5b469293fbb2fad"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)