import firebase from "firebase";

import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTKEiPUqXTocG6AaWwNSdvTg7myfV81QY",
  authDomain: "dream-code-e5b06.firebaseapp.com",
  databaseURL: "https://dream-code-e5b06.firebaseio.com",
  projectId: "dream-code-e5b06",
  storageBucket: "dream-code-e5b06.appspot.com",
  messagingSenderId: "1002598115761",
  appId: "1:1002598115761:web:1b286ea2179d7683913590",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const auth = firebase.auth();

export default { db, auth };
