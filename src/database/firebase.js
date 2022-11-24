import firebase from "firebase/app";
import "firebase/firebase-analytics";
import "firebase/firebase-database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "only-one-planet.firebaseapp.com",
  databaseURL: "https://only-one-planet.firebaseio.com",
  projectId: "only-one-planet",
  storageBucket: "only-one-planet.appspot.com",
  messagingSenderId: "471215055687",
  appId: "1:471215055687:web:78a133f2f5638fe2076262",
  measurementId: "G-6Q42GBEL8E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const databaseRef = firebase.database().ref();
console.log(databaseRef);
export const treesRef = databaseRef.child("trees");
console.log(treesRef);
export const planetRef = databaseRef.child("planet");
export const cansRef = databaseRef.child("rest/saving-data/fireblog/cans");
