import { initializeApp } from "firebase/app";

// cSpell: disable
const firebaseConfig = {
    apiKey: "AIzaSyBfnyZncqNom_EoTQvLFm0h7svz6nVzeAw",
    authDomain: "grades-explorer.firebaseapp.com",
    projectId: "grades-explorer",
    storageBucket: "grades-explorer.appspot.com",
    messagingSenderId: "49640663112",
    appId: "1:49640663112:web:2ad29b750de987a205507d",
    measurementId: "G-6YZ41TH8Q5",
};
// cSpell: enable

const app = initializeApp(firebaseConfig);

export const firebaseApp = app;
