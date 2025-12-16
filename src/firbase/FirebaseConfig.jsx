

import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyD7ZxHWmKc13BR8bnGvt-XFKGmCf23oBkU",
  authDomain: "myecommerce-55d0f.firebaseapp.com",
  projectId: "myecommerce-55d0f",
  storageBucket: "myecommerce-55d0f.firebasestorage.app",
  messagingSenderId: "1032596648497",
  appId: "1:1032596648497:web:604013aeb3032275435b10",
  databaseURL: "https://myecommerce-55d0f-default-rtdb.asia-southeast1.firebasedatabase.app"
};


const app = initializeApp(firebaseConfig); 
const db = getDatabase(app);
const  auth = getAuth(app);
export {db, auth};
