import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXV7JIt7i3XJGx1yDQdE3DlpOquTk4Im4",
  authDomain: "think-piece-cc1af.firebaseapp.com",
  databaseURL: "https://think-piece-cc1af.firebaseio.com",
  projectId: "think-piece-cc1af",
  storageBucket: "think-piece-cc1af.appspot.com",
  messagingSenderId: "915153941464",
  appId: "1:915153941464:web:985497573b77d7e0"
};

firebase.initializeApp(firebaseConfig);

window.firebase = firebase;

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
