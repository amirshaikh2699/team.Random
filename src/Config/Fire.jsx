import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiBDZR2KVp0IWNHk8FozJHMOi-sSco5xE",
  authDomain: "team-random.firebaseapp.com",
  databaseURL: "https://team-random.firebaseio.com",
  projectId: "team-random",
  storageBucket: "team-random.appspot.com",
  messagingSenderId: "546831934983",
  appId: "1:546831934983:web:b8928783509ff2a8"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
