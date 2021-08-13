import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyApu09twsn7m3N7FzOXHWlM9OLml2Je3Vo",
    authDomain: "booksquizapp-2f4fa.firebaseapp.com",
    projectId: "booksquizapp-2f4fa",
    storageBucket: "booksquizapp-2f4fa.appspot.com",
    messagingSenderId: "406841339376",
    appId: "1:406841339376:web:f34cfbdcd2fd052f75c135",
    measurementId: "G-52S5GZWGSE"
  };


  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();