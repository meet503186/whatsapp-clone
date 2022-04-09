import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getFirestore } from "firebase/firestore/lite";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD3GRwoD3sf1Kg5iGsGMQ81yNvtto-TzRw",
  authDomain: "whatsapp-2-8b38d.firebaseapp.com",
  projectId: "whatsapp-2-8b38d",
  storageBucket: "whatsapp-2-8b38d.appspot.com",
  messagingSenderId: "563612698430",
  appId: "1:563612698430:web:3ef5628b969ce816214e6f",
};

const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider;

export { db, auth, provider, firebase };