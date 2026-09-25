import{initializeApp}from"firebase/app";
import{getAuth}from"firebase/auth";
import{getFirestore}from"firebase/firestore";
const firebaseConfig={apiKey:"AIzaSyCZ7_HSnpqkA9vAfaSkCiKxBbtl6Exbpgc",authDomain:"libra-3bfb9.firebaseapp.com",databaseURL:"https://libra-3bfb9-default-rtdb.europe-west1.firebasedatabase.app",projectId:"libra-3bfb9",storageBucket:"libra-3bfb9.firebasestorage.app",messagingSenderId:"705929327966",appId:"1:705929327966:web:462d24fc1ab3f37f3ccbcf",measurementId:"G-TPKMW6L25D"};
const app=initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);