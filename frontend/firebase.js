import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCovk3J5xoTiDojgrWquSqpSNWvdgJIRmc",
    authDomain: "fpformationheds.firebaseapp.com",
    databaseURL: "https://fpformationheds-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "fpformationheds",
    storageBucket: "fpformationheds.appspot.com",
    messagingSenderId: "695199918094",
    appId: "1:695199918094:web:4504dc1940316e17f0f45f"
};

// Initialisez Firebase en utilisant initializeApp directement, sans faire référence à firebase.
const app = initializeApp(firebaseConfig);

// Obtenez une instance de la base de données en utilisant getDatabase.
const db = getDatabase(app);

console.log(db);

export { db };
