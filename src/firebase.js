
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkMC-jAUvzSo9PWZLCVdjbBsxbXkiPqdo",
    authDomain: "bucketit-b4730.firebaseapp.com",
    projectId: "bucketit-b4730",
    storageBucket: "bucketit-b4730.appspot.com",
    messagingSenderId: "693316851314",
    appId: "1:693316851314:web:110ec52fb17f3d71ac94eb",
    measurementId: "G-FH41KLEKK7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
